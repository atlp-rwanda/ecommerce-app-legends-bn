module.exports = {
    testEnvironment: 'node',
    testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'],
    globalSetup: './jest.setup.js', // specify the global setup file
    verbose: true,
    testEnvironmentVariables: {
      NODE_ENV: 'test'
    },
    testTimeout: 32000,
    collectCoverage: true,
    coverageDirectory: 'coverage',
    collectCoverageFrom: ['src/**/*.js','!src/database/**/*.js',"!src/models/index.js"],
    coverageReporters: ['text', 'html', 'json', 'lcov', 'json-summary']
  };
  