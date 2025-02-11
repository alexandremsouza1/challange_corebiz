module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/src/tests/setup.ts'],
  testMatch: ['<rootDir>/src/tests/**/*.{ts,tsx}'],
  testPathIgnorePatterns: ['<rootDir>/build/', '<rootDir>/src/tests/setup.ts'],
};