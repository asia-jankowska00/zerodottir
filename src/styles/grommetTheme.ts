import { deepMerge } from 'grommet/utils'

export const grommetTheme = deepMerge({
  global: {
    font: {
      family: 'Cabin',
      size: '14px',
    },
    colors: {
      brand: '#8AA53F',
      'accent-1': '#DE8B35',
      'neutral-1': '#6F872C',
      'neutral-2': '#52661C',
      'neutral-3': '#3D5330',
      'light-1': '#FFFFFE',
      'light-2': '#FCFBF2',
      'light-3': '#EFEEE0',
      'dark-1': '#333333',
      'dark-2': '#5A5857',
      focus: 'accent-1',
      white: 'light-1',
      border: 'rgba(0, 0, 0, 0.2)',
    },
    edgeSize: {
      pageMargin: '10%',
    },
    breakpoints: {
      small: {
        edgeSize: {
          pageMargin: '10%',
        },
      },
    },
  },
  button: {
    border: {
      radius: '4px',
    },
    color: 'light-2',
    default: {
      color: 'light-2',
      font: {
        weight: 700,
      },
    },
    size: {
      small: {
        border: {
          radius: '4px',
        },
      },
      medium: {
        border: {
          radius: '4px',
        },
      },
      large: {
        border: {
          radius: '4px',
        },
      },
    },
    primary: {
      background: 'brand',
      color: 'light-2',
      font: {
        weight: 700,
      },
    },
  },
  // card: {
  //   container: {
  //     border: {
  //       radius: 0,
  //     },
  //   },
  // },
})
