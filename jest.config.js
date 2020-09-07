module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/**/*-protocols.ts',
    '!<rootDir>/src/main/**',
    '!**/protocols/**',
    '!**/test/**',
    '!<rootDir>/src/infra/validators/**',
    '!<rootDir>/src/infra/bd/postgresql/typeorm/**'
  ],
  coverageDirectory: 'coverage',
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
}
