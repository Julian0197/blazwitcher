import { IconSearch } from '@douyinfe/semi-icons'
import { Layout, Nav } from '@douyinfe/semi-ui'
import { useState } from 'react'
import { AppearancePanel } from './appearance-panel'
import { KeyboardPanel } from './keyboard-panel'
import { SearchPanel } from './search-panel'

export const SettingPanels: React.FC = () => {
	const [activeKey, setActiveKey] = useState('appearance')

	const navItems = [
		{ itemKey: 'appearance', text: '外观', icon: <IconSearch /> },
		{ itemKey: 'keyboard', text: '快捷键', icon: <IconSearch /> },
		{ itemKey: 'search', text: '搜索', icon: <IconSearch /> },
	]

	const renderPanel = () => {
		switch (activeKey) {
			case 'appearance':
				return <AppearancePanel />
			case 'keyboard':
				return <KeyboardPanel />
			case 'search':
				return <SearchPanel />
			default:
				return null
		}
	}

	return (
		<Layout style={{ height: '100vh', backgroundColor: 'var(--semi-color-bg-0)' }}>
			<Layout.Sider style={{ backgroundColor: 'var(--semi-color-bg-1)' }}>
				<Nav
					style={{ height: '100%' }}
					items={navItems}
					selectedKeys={[activeKey]}
					onSelect={(data) => setActiveKey(data.itemKey)}
				/>
			</Layout.Sider>
			<Layout.Content style={{ padding: '24px', backgroundColor: 'var(--semi-color-bg-0)' }}>
				{renderPanel()}
			</Layout.Content>
		</Layout>
	)
}
