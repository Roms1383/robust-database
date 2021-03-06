module.exports = {
  roots: [
    '<rootDir>/src'
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: [
    'ts',
    'js',
    'json',
    'node'
  ],
  testEnvironment: 'node',
  coverageDirectory: './coverage/',
  collectCoverage: true
}
