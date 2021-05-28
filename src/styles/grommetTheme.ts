import { deepFreeze } from 'grommet/utils'

export const grommetTheme = deepFreeze({
  global: {
    font: {
      family: 'Cabin',
      size: '14px',
    },
    colors: {
      brand: '#8AA53F',
      focus: '#6FFFBB',
      'accent-1': '#DE8B35',
    },
  },
  button: {
    border: {
      radius: '4px',
    },
  },
})
