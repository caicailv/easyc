// postcss.config.js
const autoprefixer = require('autoprefixer')
module.exports = {
  plugins: [
    autoprefixer({
      overrideBrowserslist: ['Android 4.1', 'iOS 7.1'],
      grid: true,
    }),
  ],
}
