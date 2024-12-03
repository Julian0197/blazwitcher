import SettingSvg from 'react:~assets/setting.svg'
import { IconDesktop, IconKey, IconMoon, IconSearch, IconSun } from '@douyinfe/semi-icons'
import { Button, Input, Modal, Radio, Select, Space, Switch, TabPane, Tabs, Typography } from '@douyinfe/semi-ui'
import React, { useState } from 'react'
import type { CommandPlugin } from '~shared/types'

const { Title, Text } = Typography

// 子组件: 外观设置
const AppearanceSettings = ({ theme, setTheme, sidePanelSize, setSidePanelSize }) => (
	<Space vertical align='start' spacing='loose'>
		<div>
			<Title heading={3}>主题</Title>
			<Radio.Group value={theme} onChange={(e) => setTheme(e.target.value)} style={{ marginTop: 12 }}>
				<Radio value='light'>
					<Space align='center'>
						<IconSun />
						<Text>浅色</Text>
					</Space>
				</Radio>
				<Radio value='dark'>
					<Space align='center'>
						<IconMoon />
						<Text>深色</Text>
					</Space>
				</Radio>
				<Radio value='system'>
					<Space align='center'>
						<IconDesktop />
						<Text>系统</Text>
					</Space>
				</Radio>
			</Radio.Group>
		</div>
		<div>
			<Title heading={3}>侧边栏大小</Title>
			<Select style={{ width: 200, marginTop: 12 }} value={sidePanelSize} onChange={(value) => setSidePanelSize(value)}>
				<Select.Option value='small'>小</Select.Option>
				<Select.Option value='medium'>中</Select.Option>
				<Select.Option value='large'>大</Select.Option>
			</Select>
		</div>
	</Space>
)

// 子组件: 快捷键设置
const ShortcutSettings = () => {
	const [shortcuts, setShortcuts] = useState({
		openSettings: 'Cmd+,',
		newTab: 'Cmd+T',
	})

	const handleShortcutChange = (key, value) => {
		setShortcuts((prev) => ({ ...prev, [key]: value }))
	}

	const resetToDefault = () => {
		setShortcuts({
			openSettings: 'Cmd+,',
			newTab: 'Cmd+T',
		})
	}

	return (
		<Space vertical align='start' spacing='loose'>
			<Title heading={3}>快捷键设置</Title>
			<Space vertical align='start'>
				{Object.entries(shortcuts).map(([key, value]) => (
					<div key={key} style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
						<Text>{key === 'openSettings' ? '打开设置' : '新建标签页'}</Text>
						<Input
							value={value}
							onChange={(value) => handleShortcutChange(key, value)}
							style={{ width: 150 }}
							onKeyDown={(e) => {
								e.preventDefault()
								const keyString = `${e.ctrlKey ? 'Ctrl+' : ''}${e.metaKey ? 'Cmd+' : ''}${e.altKey ? 'Alt+' : ''}${e.key.toUpperCase()}`
								handleShortcutChange(key, keyString)
							}}
						/>
					</div>
				))}
			</Space>
			<Space>
				<Button theme='borderless' onClick={resetToDefault}>
					恢复默认
				</Button>
				<Button theme='solid'>保存</Button>
			</Space>
		</Space>
	)
}

// 子组件: 搜索参数设置
const SearchSettings = ({ searchSettings, setSearchSettings }) => (
	<Space vertical align='start' spacing='loose'>
		<Title heading={3}>搜索参数设置</Title>
		<Space vertical align='start'>
			<div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
				<Text>可回溯搜索的搜索条数</Text>
				<Input
					type='number'
					style={{ width: 150 }}
					value={searchSettings.historyCount}
					onChange={(value) => setSearchSettings({ ...searchSettings, historyCount: parseInt(value) })}
				/>
			</div>
			<div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
				<Text>回溯历史记录时间（天）</Text>
				<Input
					type='number'
					style={{ width: 150 }}
					value={searchSettings.historyDays}
					onChange={(value) => setSearchSettings({ ...searchSettings, historyDays: parseInt(value) })}
				/>
			</div>
		</Space>
		<Space vertical align='start'>
			<Text>搜索源配置</Text>
			<Space wrap>
				{['title', 'domain', 'groupName', 'folderName'].map((source) => (
					<div key={source}>
						<Switch
							checked={searchSettings.sources.includes(source)}
							onChange={(checked) => {
								const newSources = checked
									? [...searchSettings.sources, source]
									: searchSettings.sources.filter((s) => s !== source)
								setSearchSettings({ ...searchSettings, sources: newSources })
							}}
						/>
						<Text style={{ marginLeft: 8 }}>{source}</Text>
					</div>
				))}
			</Space>
		</Space>
		<Space vertical align='start'>
			<Text>默认检索的类型</Text>
			<Space wrap>
				{['tab', 'history', 'bookmark'].map((type) => (
					<div key={type}>
						<Switch
							checked={searchSettings.types.includes(type)}
							onChange={(checked) => {
								const newTypes = checked
									? [...searchSettings.types, type]
									: searchSettings.types.filter((t) => t !== type)
								setSearchSettings({ ...searchSettings, types: newTypes })
							}}
						/>
						<Text style={{ marginLeft: 8 }}>{type}</Text>
					</div>
				))}
			</Space>
		</Space>
	</Space>
)

const ConfigurationModal = ({ visible, onClose }) => {
	const [activeTab, setActiveTab] = useState('appearance')
	const [theme, setTheme] = useState('system')
	const [sidePanelSize, setSidePanelSize] = useState('medium')
	const [searchSettings, setSearchSettings] = useState({
		historyCount: 200,
		historyDays: 14,
		sources: ['title', 'domain'],
		types: ['tab', 'history', 'bookmark'],
	})

	return (
		<Modal visible={visible} onCancel={onClose} footer={null} width={900} bodyStyle={{ padding: 0, height: 600 }}>
			<Tabs tabPosition='left' activeKey={activeTab} onChange={setActiveTab} style={{ height: '100%' }}>
				<TabPane
					tab={
						<span>
							<IconSun style={{ marginRight: 8 }} />
							外观
						</span>
					}
					itemKey='appearance'
				>
					<div style={{ padding: 24 }}>
						<AppearanceSettings
							theme={theme}
							setTheme={setTheme}
							sidePanelSize={sidePanelSize}
							setSidePanelSize={setSidePanelSize}
						/>
					</div>
				</TabPane>
				<TabPane
					tab={
						<span>
							<IconKey style={{ marginRight: 8 }} />
							快捷键设置
						</span>
					}
					itemKey='shortcuts'
				>
					<div style={{ padding: 24 }}>
						<ShortcutSettings />
					</div>
				</TabPane>
				<TabPane
					tab={
						<span>
							<IconSearch style={{ marginRight: 8 }} />
							搜索参数设置
						</span>
					}
					itemKey='search'
				>
					<div style={{ padding: 24 }}>
						<SearchSettings searchSettings={searchSettings} setSearchSettings={setSearchSettings} />
					</div>
				</TabPane>
			</Tabs>
		</Modal>
	)
}

export const settingPlugin: CommandPlugin = {
	command: '/setting',
	description: 'Setting Page',
	icon: <SettingSvg width={24} height={24} />,
	render: () => (
		<div>
			<ConfigurationModal visible={true} onClose={() => {}} />
		</div>
	),
}
