// module.exports = function ({addComponents, addBase, config}) {
//
//   const primaryBtnColors = {
//     textColor: '#fdfdfe',
//     textColorDark: '#d8e2ef',
//     disabledTextColor: '#d6dfec',
//     disabledTextColorDark: '#8a9098',
//   }
//   //TODO: add more buttons for warning danger success
//
//   addBase({
//     '.btn-primary': config('theme.buttons.btnTransform'),
//     '.btn-primary-dark': config('theme.buttons.btnTransform'),
//     '.btn-primary-disabled': config('theme.buttons.btn'),
//     '.btn-primary-disabled-dark': config('theme.buttons.btn'),
//     '.btn-secondary': config('theme.buttons.btnTransform'),
//     '.btn-secondary-dark': config('theme.buttons.btnTransform'),
//   })
//
//   const buttons = {
//     '.btn-primary': {
//       color: primaryBtnColors.textColor,
//       backgroundColor: '#3B82F6',
//       '&:hover': {
//         backgroundColor: '#0B63F3'
//       },
//     },
//     '.btn-primary-dark': {
//       backgroundColor: '#2362b7',
//       color: primaryBtnColors.textColorDark,
//       '&:hover': {
//         backgroundColor: '#2c7be5'
//       },
//     },
//     '.btn-primary-disabled': {
//       color: primaryBtnColors.disabledTextColor,
//       backgroundColor: '#74a8ed',
//       padding: '.5rem 1rem',
//       borderRadius: '.25rem',
//       fontWeight: '600',
//     },
//     '.btn-primary-disabled-dark': {
//       backgroundColor: '#214e8b',
//       color: primaryBtnColors.disabledTextColorDark,
//       padding: '.5rem 1rem',
//       borderRadius: '.25rem',
//       fontWeight: '600',
//     },
//     '.btn-secondary': {
//       backgroundColor: '#667eea',
//       '&:hover': {
//         backgroundColor: '#5a67d8'
//       },
//     },
//     '.btn-secondary-dark': {
//       backgroundColor: '#4657a9',
//       '&:hover': {
//         backgroundColor: '#5a67d8'
//       },
//     },
//     'btn-secondary-disabled': {},
//     'btn-secondary-disabled-dark': {},
//   }
//
//   addComponents(buttons)
// }
