/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  darkMode: 'class',
  theme: {
    buttons: {
      btn: {
        padding: '.5rem 1rem',
        borderRadius: '.25rem',
        fontWeight: '600',
        border: 'transparent',
        boxShadow: '0 7px 14px 0 rgba(3, 12, 51, 0.15), 0 3px 6px 0 rgba(0, 0, 0, 0.2)',
        transition: 'ease-in-out 150ms'
      },
      btnTransform: {
        padding: '.5rem 1rem',
        borderRadius: '.25rem',
        fontWeight: '600',
        border: 'transparent',
        boxShadow: '0 7px 14px 0 rgba(3, 12, 51, 0.15), 0 3px 6px 0 rgba(0, 0, 0, 0.2)',
        transition: 'ease-in-out 150ms',
        '&:hover': {
          transform: 'scale(1.05)',
        },
        '&:focus': {
          outline: 'none'
        },
        '&:active': {
          transform: 'scale(0.95)'
        }
      },
    },
    containers: {
      box: {
        width: '96vw',
        padding: '21px',
        borderRadius: '0.375rem',
        boxShadow: '0 7px 14px 0rgba(65, 69, 88, 0.1), 0 3px 6px 0rgba(0, 0, 0, 0.07)',
      },
      'box-scale': {
        width: '100%',
        padding: '21px',
        borderRadius: '0.375rem',
        boxShadow: '0 7px 14px 0rgba(65, 69, 88, 0.1), 0 3px 6px 0rgba(0, 0, 0, 0.07)',
        transition: 'ease-in-out 150ms',
        '&:hover': {
          transform: 'scale(1.05)'
        },
        '&:active': {
          transform: 'scale(0.95)'
        }
      }
    },
    extend: {},
  },
  plugins: [
    function ({addComponents, addBase, config}) {

      const primaryBtnColors = {
        textColor: '#fdfdfe',
        textColorDark: '#d8e2ef',
        disabledTextColor: '#d6dfec',
        disabledTextColorDark: '#8a9098',
      }
      //TODO: add more buttons for warning danger success

      addBase({
        '.btn-primary': config('theme.buttons.btnTransform'),
        '.btn-primary-dark': config('theme.buttons.btnTransform'),
        '.btn-primary-disabled': config('theme.buttons.btn'),
        '.btn-primary-disabled-dark': config('theme.buttons.btn'),
        '.btn-secondary': config('theme.buttons.btnTransform'),
        '.btn-secondary-dark': config('theme.buttons.btnTransform'),
        '.container': config('theme.containers.box'),
        '.container-light': config('theme.containers.box'),
        '.container-dark': config('theme.containers.box'),
        '.card': config('theme.containers.box'),
        '.card-dark': config('theme.containers.box'),
        '.card-scale': config('theme.containers.box-scale'),
        '.card-scale-dark': config('theme.containers.box-scale'),
      })

      const classes = {
        '.btn-primary': {
          color: primaryBtnColors.textColor,
          backgroundColor: '#3B82F6',
          '&:hover': {
            backgroundColor: '#0B63F3'
          },
        },
        '.btn-primary-dark': {
          backgroundColor: '#2362b7',
          color: primaryBtnColors.textColorDark,
          '&:hover': {
            backgroundColor: '#2c7be5'
          },
        },
        '.btn-primary-disabled': {
          color: primaryBtnColors.disabledTextColor,
          backgroundColor: '#74a8ed',
          padding: '.5rem 1rem',
          borderRadius: '.25rem',
          fontWeight: '600',
        },
        '.btn-primary-disabled-dark': {
          backgroundColor: '#214e8b',
          color: primaryBtnColors.disabledTextColorDark,
          padding: '.5rem 1rem',
          borderRadius: '.25rem',
          fontWeight: '600',
        },
        '.btn-secondary': {
          backgroundColor: '#667eea',
          '&:hover': {
            backgroundColor: '#5a67d8'
          },
        },
        '.btn-secondary-dark': {
          backgroundColor: '#4657a9',
          '&:hover': {
            backgroundColor: '#5a67d8'
          },
        },
        'btn-secondary-disabled': {},
        'btn-secondary-disabled-dark': {},
        'text-color-light': {color: '#5e6e82'},
        'text-color-dark': {color: '#9da9bb'},
        '.container': {
          backgroundColor: 'transparent'
        },
        '.container-light': {
          backgroundColor: '#fff'
        },
        '.container-dark': {
          backgroundColor: '#232e3c'
        },
        '.card': {
          backgroundColor: '#c1cbda'
        },
        '.card-dark': {
          backgroundColor: '#303f51'
        }
      }

      addComponents(classes)
    }

  ],
}
