/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    moduleNameMapper: {
        '^@components/(.*)$': '<rootDir>/components/$1',
        '^@services/(.*)$': '<rootDir>/services/$1',
        '^@types$': '<rootDir>/types/index.ts',
        '^@styles/(.*)$': '<rootDir>/styles/$1',
    },
};
