import { useEffect, useState } from 'react'
import styled from 'styled-components'

const ProgressContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 6px;
	min-width: 100px;
	height: 32px;
	padding: 0 8px;
	border-radius: 6px;
	background: var(--color-neutral-1);
	border: 1px solid var(--color-neutral-4);
`

const ProgressBarWrapper = styled.div`
	flex: 1;
	min-width: 60px;
	max-width: 120px;
	height: 4px;
	background: var(--color-neutral-5);
	border-radius: 2px;
	overflow: hidden;
`

const ProgressBar = styled.div<{ $percentage: number; $color: string }>`
	height: 100%;
	width: ${props => props.$percentage}%;
	background: ${props => props.$color};
	border-radius: 2px;
	transition: width 0.3s ease, background-color 0.3s ease;
`

const ProgressText = styled.span<{ $percentage: number }>`
	font-size: 11px;
	font-weight: 600;
	color: ${props => {
		if (props.$percentage === 100) return '#52c41a' // 绿色
		if (props.$percentage >= 80) return '#1890ff' // 蓝色
		if (props.$percentage >= 50) return '#faad14' // 橙色
		return '#ff4d4f' // 红色
	}};
	transition: color 0.3s ease;
	min-width: 28px;
	text-align: center;
`

interface ProgressData {
	total: number
	completed: number
	percentage: number
}

interface TabGroupProgressProps {
	isVisible: boolean
	onComplete?: () => void
}

export const TabGroupProgress: React.FC<TabGroupProgressProps> = ({ isVisible, onComplete }) => {
	const [progress, setProgress] = useState<ProgressData | null>(null)

	useEffect(() => {
		if (!isVisible) {
			setProgress(null)
			return
		}

		const handleProgressUpdate = (message: any) => {
			if (message.type === 'tabGroupProgressUpdate') {
				setProgress(message.progress)
				// 100% done
				if (message.progress.percentage === 100) {
					setTimeout(() => {
						onComplete?.()
					}, 1000)
				}
			}
		}

		// 监听来自background的消息
		chrome.runtime.onMessage.addListener(handleProgressUpdate)

		return () => {
			chrome.runtime.onMessage.removeListener(handleProgressUpdate)
		}
	}, [isVisible, onComplete])

	if (!isVisible || !progress) {
		return null
	}

	// 根据进度选择颜色
	const getProgressColor = (percentage: number) => {
		if (percentage === 100) return '#52c41a' // 绿色
		if (percentage >= 80) return '#1890ff' // 蓝色
		if (percentage >= 50) return '#faad14' // 橙色
		return '#ff4d4f' // 红色
	}

	const progressColor = getProgressColor(progress.percentage)

	return (
		<ProgressContainer>
			<ProgressBarWrapper>
				<ProgressBar $percentage={progress.percentage} $color={progressColor} />
			</ProgressBarWrapper>
			<ProgressText $percentage={progress.percentage}>
				{progress.percentage}%
			</ProgressText>
		</ProgressContainer>
	)
}
