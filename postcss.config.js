// postcss.config.js
const autoprefixer = require('autoprefixer');
const postCss1px = require('postcss-border-1px');
module.exports = {
  plugins: [autoprefixer({
    overrideBrowserslist: [
      "Android 4.1",
      "iOS 7.1",
    ],
    grid: true
  }),
    postCss1px
  ],
  // 'postcss-pxtorem': {
  //   rootValue: 100,
  //   propList: ['*']
  // }

};