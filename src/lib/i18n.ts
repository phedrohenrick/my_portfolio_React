import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import enTranslations from '../locale/en.json'
import ptTranslations from '../locale/pt.json'

i18n.use(initReactI18next).init({
    resources: {
        en: { ...enTranslations },
        pt: { ...ptTranslations },
    },
    lng: 'pt',
    fallbackLng: 'pt',
    interpolation: { escapeValue: false },
})

i18n.on('languageChanged', (lng) => {
    document.documentElement.lang = lng === 'en' ? 'en' : 'pt-BR'
})

export default i18n
