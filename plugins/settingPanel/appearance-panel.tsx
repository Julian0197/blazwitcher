import { Card, Radio } from '@douyinfe/semi-ui'

export const AppearancePanel: React.FC = () => (
	<Card title='主题设置' style={{ boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)' }}>
		<div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
			<div>
				<div style={{ marginBottom: '8px', fontWeight: 500 }}>外观模式</div>
				<Radio.Group type='card' defaultValue='system'>
					<Radio value='light'>
						<div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
							{/* <IconSun /> */}
							<span>浅色</span>
						</div>
					</Radio>
					<Radio value='dark'>
						<div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
							{/* <IconMoon /> */}
							<span>深色</span>
						</div>
					</Radio>
					<Radio value='system'>
						<div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
							{/* <IconDesktop /> */}
							<span>跟随系统</span>
						</div>
					</Radio>
				</Radio.Group>
			</div>

			<div>
				<div style={{ marginBottom: '8px', fontWeight: 500 }}>窗口大小</div>
				<Radio.Group type='button' defaultValue='medium'>
					<Radio value='small'>小</Radio>
					<Radio value='medium'>中</Radio>
					<Radio value='large'>大</Radio>
				</Radio.Group>
			</div>
		</div>
	</Card>
)
