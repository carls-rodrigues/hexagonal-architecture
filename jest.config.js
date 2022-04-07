module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ['./test'],
  // collectCoverage: true,
  collectCoverageFrom: [
    '!./tests/**/',
    // '!./src/'
  ],
  coverageDirectory: './coverage',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': 'ts-jest'
  }

}