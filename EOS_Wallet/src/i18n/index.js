import {CHINESE, ENGLISH} from '../constant'
import { getLanguage } from '../lib/js/storage'

const language = getLanguage() || CHINESE
const i18nConfig = {
    // this.$i18n.locale
    locale: language,
    messages: {
        [CHINESE]: require('./lang/zh'),
        [ENGLISH]: require('./lang/en')
    }
}

export default i18nConfig