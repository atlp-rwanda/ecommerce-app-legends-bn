module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'],
  globalSetup: './jest.setup.js',
  verbose: true,
  testEnvironmentVariables: {
    NODE_ENV: 'test',
  },
  testTimeout: 120000,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/database/**/*.js',
    '!src/models/index.js',
    '!src/index.js',
    '!src/middlewares/**/*.js',
    '!src/utils/sendEmail.js',
    '!src/docs/**/*.js',
  ],
  coverageReporters: ['text', 'html', 'json', 'lcov', 'json-summary'],
};
