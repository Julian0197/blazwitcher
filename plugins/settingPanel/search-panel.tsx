import { Card, Checkbox, Form } from '@douyinfe/semi-ui'

export const SearchPanel: React.FC = () => {
	return (
		<Card title='搜索参数设置' style={{ boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)' }}>
			<Form layout='vertical'>
				<Form.InputNumber field='maxResults' label='可回溯搜索的搜索条数' initValue={200} style={{ width: 200 }} />
				<Form.InputNumber field='historyDays' label='回溯历史记录时间（天）' initValue={14} style={{ width: 200 }} />

				<div style={{ marginTop: '24px' }}>
					<div style={{ marginBottom: '16px', fontWeight: 500 }}>搜索源配置</div>
					<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
						<Checkbox defaultChecked>title</Checkbox>
						<Checkbox defaultChecked>domain</Checkbox>
						<Checkbox>groupName</Checkbox>
						<Checkbox>folderName</Checkbox>
					</div>
				</div>

				<div style={{ marginTop: '24px' }}>
					<div style={{ marginBottom: '16px', fontWeight: 500 }}>默认检索的类型</div>
					<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
						<Checkbox defaultChecked>tab</Checkbox>
						<Checkbox defaultChecked>history</Checkbox>
						<Checkbox defaultChecked>bookmark</Checkbox>
					</div>
				</div>
			</Form>
		</Card>
	)
}
