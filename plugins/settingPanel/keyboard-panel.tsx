import { Card, Table } from '@douyinfe/semi-ui'

export const KeyboardPanel: React.FC = () => {
	const columns = [
		{ title: '功能', dataIndex: 'action' },
		{ title: '快捷键', dataIndex: 'shortcut' },
	]

	const data = [
		{ key: '1', action: '打开搜索', shortcut: '⌘ + K' },
		{ key: '2', action: '切换主题', shortcut: '⌘ + T' },
		{ key: '3', action: '刷新', shortcut: '⌘ + R' },
		{ key: '4', action: '新建标签', shortcut: '⌘ + N' },
		{ key: '5', action: '关闭标签', shortcut: '⌘ + W' },
	]

	return (
		<Card title='快捷键设置' style={{ boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)' }}>
			<Table columns={columns} dataSource={data} pagination={false} />
		</Card>
	)
}
