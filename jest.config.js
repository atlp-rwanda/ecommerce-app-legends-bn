module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'],
  globalSetup: './jest.setup.js', // specify the global setup file
  verbose: true,
  testEnvironmentVariables: {
    NODE_ENV: 'test',
  },
  testTimeout: 80000,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/database/**/*.js',
    '!src/models/index.js',
    '!src/utils/sendEmail.js',
    '!src/docs/**/*.js',
    "!src/controllers/Auth/google_oauth.js",
    "!src/controllers/Auth/updateUser.js",
    "!src/controllers/products/productController.js",
    "!src/controllers/products/categoryController.js",
    "!src/controllers/products/ProductImagesController.js",
    "!src/controllers/products/ProductImagesController.js",
    "!src/controllers/products/productVariationsControllers.js",
    "!src/utils/validations/*.js",
    "!src/utils/grabbingImages.js",
    "!src/middleware/**/*.js",
  ],
  coverageReporters: ['text', 'html', 'json', 'lcov', 'json-summary'],
};
