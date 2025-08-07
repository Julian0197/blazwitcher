import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { MAIN_WINDOW } from '~shared/constants'
import { originalListAtom, windowDataListAtom } from '~sidepanel/atom'

// 提取现有分组信息，包含分组中的标签页详细信息
const extractExistingGroups = (data: any[]) => {
	const groupMap = new Map()

	data.forEach((item) => {
		if (item.itemType === 'tab' && item.data.tabGroup) {
			const group = item.data.tabGroup
			if (!groupMap.has(group.id)) {
				groupMap.set(group.id, {
					id: group.id,
					title: group.title,
					color: group.color,
					memberCount: 0,
					hosts: new Set(),
					tabs: [], // 存储分组中的标签页详细信息
				})
			}
			const groupInfo = groupMap.get(group.id)
			groupInfo.memberCount++

			// 添加标签页详细信息（包含windowId）
			groupInfo.tabs.push({
				title: item.data.title,
				url: item.data.url,
				host: item.data.host,
				windowId: item.data.windowId,
			})

			// 收集域名信息
			const host = item.data.host
			groupInfo.hosts.add(host)
		}
	})

	// 转换为数组格式
	return Array.from(groupMap.values()).map((group) => ({
		...group,
		hosts: Array.from(group.hosts),
	}))
}

// 按windowId对数据进行聚类处理
const processDataForAI = (data: any[]) => {
	const tabs = data.filter((item) => item.itemType === 'tab')

	// 按windowId分组
	const windowGroups = new Map()

	tabs.forEach((item) => {
		const windowId = item.data.windowId
		if (!windowGroups.has(windowId)) {
			windowGroups.set(windowId, [])
		}
		windowGroups.get(windowId).push(item)
	})

	// 为每个窗口生成单独的数据结构
	const windowDataList = []

	windowGroups.forEach((windowTabs, windowId) => {
		// 提取当前窗口的现有分组信息
		const existingGroups = extractExistingGroups(windowTabs)

		// 只处理当前窗口中未分组的标签页
		const ungroupedTabs = windowTabs
			.filter((item) => !item.data.tabGroup)
			.map((item) => ({
				itemType: item.itemType,
				data: {
					id: item.data.id,
					title: item.data.title,
					url: item.data.url,
					host: item.data.host,
				},
			}))

		windowDataList.push({
			windowId,
			ungroupedTabs,
			existingGroups,
			summary: {
				totalTabs: windowTabs.length,
				ungroupedTabs: ungroupedTabs.length,
				existingGroupsCount: existingGroups.length,
			},
		})
	})

	return windowDataList
}

export default function useOriginalList() {
	const [originalList, setOriginalList] = useAtom(originalListAtom)
	const [, setWindowDataList] = useAtom(windowDataListAtom)

	useEffect(() => {
		let portConnectStatus = false
		const port = chrome.runtime.connect({ name: MAIN_WINDOW })
		port.onMessage.addListener((processedList) => {
			portConnectStatus = true
			if (process.env.NODE_ENV !== 'production') {
				console.log('processedList', processedList)
				// 处理数据并保存到内存中
				const windowDataList = processDataForAI(processedList)
				console.log('windowDataList for AI:', windowDataList)
				setWindowDataList(windowDataList)
			}
			setOriginalList(processedList)
		})

		const postMessageToCloseWindow = () => {
			if (!portConnectStatus) return
			port.postMessage({ type: 'close' })
			port.disconnect()
			portConnectStatus = false
		}
		window.addEventListener('unload', postMessageToCloseWindow)
		if (process.env.NODE_ENV === 'production') {
			window.addEventListener('blur', postMessageToCloseWindow)
		}
	}, [setOriginalList, setWindowDataList])
	return originalList
}

export function useWindowDataList() {
	const [windowDataList] = useAtom(windowDataListAtom)
	return windowDataList
}
