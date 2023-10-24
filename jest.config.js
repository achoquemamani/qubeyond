module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transformIgnorePatterns: ['<rootDir>/node_modules/'],
    'collectCoverage': true,
    'collectCoverageFrom': ['**/*.{js,vue}'],
    transform: {
      '^.+\\.ts?$': 'ts-jest',
      '^.+\\.vue?$': 'vue-jest',
    },
  };