module.exports = {
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  moduleFileExtensions: ['js', 'json'],
  testEnvironment: 'jsdom',
  collectCoverage: true,
  collectCoverageFrom: [
    'nuxt/**/*.js',
    'src/**/*.js'
  ],
  testEnvironmentOptions: {
    customExportConditions: ['node', 'node-addons']
  }
}
