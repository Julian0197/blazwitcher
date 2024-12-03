import { filterByBookmarkPlugin, filterByHistoryPlugin, filterByTabPlugin } from './filters'
import { settingPlugin } from './setting'

// settingPlugin
const plugins = [filterByTabPlugin, filterByHistoryPlugin, filterByBookmarkPlugin, settingPlugin]

export default plugins
