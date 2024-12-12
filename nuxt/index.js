const path = require('path')

module.exports = function (moduleOptions) {
  const options = {
    ...moduleOptions,
    ...this.options.drip
  }

  // Register plugin
  this.addPlugin({
    src: path.resolve(__dirname, 'plugin.js'),
    fileName: 'nuxt-drip.js',
    options
  })
}

module.exports.meta = require('../package.json')
