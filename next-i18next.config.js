// const { initReactI18next } = require('react-i18next')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'dk'],
  },
  localePath: path.resolve('./public/locales'),
}
