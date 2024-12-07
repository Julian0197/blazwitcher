import { atomWithReset } from 'jotai/utils'
import type { CommandPlugin, ListItemType } from '~shared/types'

export const OriginalListAtom = atomWithReset<ListItemType[]>([])
export const CompositionAtom = atomWithReset<boolean>(false)
export const HitPluginAtom = atomWithReset<CommandPlugin | null>(null)
export const SearchValueAtom = atomWithReset<{ value: string }>({ value: '' })
