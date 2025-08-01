import GithubSvg from 'react:~assets/github.svg'
import IssueSvg from 'react:~assets/issue.svg'
import { IconBellStroked } from '@douyinfe/semi-icons'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import styled, { css } from 'styled-components'
import { PopoverWrapper } from '~shared/common-styles'
import { GITHUB_ISSUE_URL, GITHUB_URL, SettingPanelKey } from '~shared/constants'
import releases from '~shared/releases.json'
import { createTabWithUrl } from '~shared/utils'
import { i18nAtom, lastViewedVersionAtom, searchValueAtom } from '~sidepanel/atom'

const CommonSvgStyle = css`
  cursor: pointer;
  padding: 3px 4px;
  border-radius: 4px;
  border: none;
  background: transparent;
  display: flex;
	&:hover {
    background-color: var(--semi-color-fill-0);
  }
  
  &:active {
    background-color: var(--semi-color-fill-1);
  }
`

const SvgWithStrokeStyle = styled.button`
  ${CommonSvgStyle}
  
  > svg {
    stroke: var(--color-neutral-5);
    stroke-width: 3px;
  }
	&:hover {
		> svg {
      stroke: var(--color-neutral-3);
    }
	}
  
`

const SvgWithFileStyle = styled.button`
  ${CommonSvgStyle}
  > svg {
    fill: var(--color-neutral-5);
  }
	&:hover {
		> svg {
    fill: var(--color-neutral-3);
    }
	}
  
`

const UpdateNotificationButton = styled.button`
  ${CommonSvgStyle}
	color: var(--color-neutral-5);
  position: relative;
  align-items: center;
  justify-content: center;
	&:hover {
		color: var(--color-neutral-3);
	}
`

const UpdateDot = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 8px;
  height: 8px;
  background: linear-gradient(135deg, #ff6b6b, #ff8e8e);
  border-radius: 50%;
  border: 1px solid white;
`

const LeftIconContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`

export default function LeftIcon() {
	const i18n = useAtomValue(i18nAtom)
	const setSearchValue = useSetAtom(searchValueAtom)
	const [lastViewedVersion, setLastViewedVersion] = useAtom(lastViewedVersionAtom)
	const newestVersion = releases?.[0]?.tag_name

	// 创建更新提示内容
	const updateContent = (
		<div style={{ textAlign: 'left' }}>
			<div style={{ fontSize: '11px', marginBottom: '2px' }}>{i18n('clickToViewUpdateLog')}</div>
		</div>
	)

	const handleUpdateClick = () => {
		setLastViewedVersion(newestVersion)
		setSearchValue({
			value: `/s ${SettingPanelKey.CHANGELOG}`,
		})
	}

	return (
		<LeftIconContainer>
			<PopoverWrapper content={i18n('githubTooltip')} position='top'>
				<SvgWithStrokeStyle onClick={() => createTabWithUrl(GITHUB_URL)}>
					<GithubSvg style={{ width: '18px', height: '18px' }} />
				</SvgWithStrokeStyle>
			</PopoverWrapper>
			<PopoverWrapper content={i18n('issueTooltip')} position='top'>
				<SvgWithFileStyle
					onClick={() => {
						createTabWithUrl(GITHUB_ISSUE_URL)
					}}
				>
					<IssueSvg style={{ width: '18px', height: '18px' }} />
				</SvgWithFileStyle>
			</PopoverWrapper>
			{lastViewedVersion !== newestVersion && (
				<PopoverWrapper content={updateContent} position='top'>
					<UpdateNotificationButton onClick={handleUpdateClick}>
						<IconBellStroked style={{ width: '18px', height: '18px' }} />
						<UpdateDot />
					</UpdateNotificationButton>
				</PopoverWrapper>
			)}
		</LeftIconContainer>
	)
}
