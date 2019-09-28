module.exports = {
  roots: [
    '<rootDir>/src',
  ],
  testRegex: '__tests__/.*.spec\\.(js|ts|tsx)?$',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleNameMapper: {
    '^@utils(.*)$': '<rootDir>/src/utils$1',
    '^@entities(.*)$': '<rootDir>/src/entities$1',
  },
}
