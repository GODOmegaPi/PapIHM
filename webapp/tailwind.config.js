module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [
    './public/**/*.html',
    './src/**/*.vue',
  ],
  theme: {
    colors: {
      white: '#FFF',
      black: '#000',
      red: '#c0392b',
      blue: '#2980b9',
      orange: '#e67e22',
      yellow: '#f1c40f',
      green: '#27ae60',
      base: '#ecf0f1',
      lightGray: '#f9f9f9',
      darkGray: '#7f8c8d',
      icon: '#34495e',
    },
    extend: {},
  },
  variants: {},
  plugins: [],
};
