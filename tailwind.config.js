module.exports = {
  mode: 'jit', // Just-In-Time Compiler
  purge: ['./views/**/*.hbs'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px'
    },
    extend: {
      colors: {
        darkBlue: '#090E34',
        textBlue: '#3056D3',
        textWhite: '#FFFFFF',
        textGrey: 'CCCCCC',
        textHero: '#C8CBCE',
        darkGrey: '#2E2E2E',
        greyOpacity: '#2a2d40',
        textLightGrey: '#637381',
        darkerGrey: '#212B36',
        black: '#000000',
        backgroundGrey: '#F7F8FA',
        red: '#FC2626',
        border: '#EBEBEB',
        icons: '#E5E5E5',
        lightBlue: 'rgba(48,86,211, 0.8)',
        lightGrey: 'rgba(42,45,64, 0.8)'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
