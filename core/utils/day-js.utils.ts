import weekday from 'dayjs/plugin/weekday'
import localeData from 'dayjs/plugin/localeData'
import advanceFormat from 'dayjs/plugin/advancedFormat'
import dayjs from 'dayjs'

dayjs.extend(weekday)
dayjs.extend(localeData)
dayjs.extend(advanceFormat)

export default dayjs
