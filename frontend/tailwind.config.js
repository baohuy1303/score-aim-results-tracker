module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors:{
        bgColor: 'var(--bg-color)',
        orange: 'var(--orange)',
        red: 'var(--red)',
        greenSelect: 'var(--green-select)',
        black: 'var(--black)',
        gradeGreen: 'var(--grade-green)',
        gradeYellow: 'var(--grade-yellow)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
