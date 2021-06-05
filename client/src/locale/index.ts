import ja from './ja'

const locales = {
  ja,
}

const language = (window.navigator.languages && window.navigator.languages.find(lang => !!locales[lang])) || 'ja'

export default locales[language]
