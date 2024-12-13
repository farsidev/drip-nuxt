const { resolve } = require('path')

module.exports = async function (moduleOptions) {
  const options = {
    ...moduleOptions,
    ...this.options.drip
  }

  // Default options
  const defaults = {
    enabled: true,
    debug: false,
    accountId: null,
    trackPages: false,
    respectDoNotTrack: true
  }

  // Merge options
  const moduleConfig = {
    ...defaults,
    ...options
  }

  // Validate required options
  if (!moduleConfig.accountId) {
    console.warn('Drip accountId is required')
  }

  // Add plugin
  this.addPlugin({
    src: resolve(__dirname, 'plugin.js'),
    fileName: 'drip-nuxt.js',
    options: moduleConfig
  })
}

module.exports.meta = require('../package.json')
