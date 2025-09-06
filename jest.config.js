module.exports = {
    testEnvironment: 'jsdom',
    testPathIgnorePatterns: ['/node_modules/', '/.next/'],
    collectCoverage: true,
    coveragePathIgnorePatterns: [
        "/node_modules/",
        "<rootDir>/src/stores/",
        "<rootDir>/src/providers/",
        "<rootDir>/src/services/",
    ],
    collectCoverageFrom: [
        'src/**/*.ts(x)?',
        '!src/app/**',
        '!src/lib/registry.tsx',
        '!src/types/**',
        '!src/**/stories.tsx',
        '!src/styles/**'
    ],
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
        '^.+\\.(js|jsx)$': 'babel-jest'
    },
    setupFilesAfterEnv: ['<rootDir>/.jest/setup.ts'],
    modulePaths: ['<rootDir>/src/'],
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }]
    },
    moduleNameMapper: {
        "^@/(.*)\\.(ts|tsx|js|jsx)$": "<rootDir>/src/$1.$2",
        '^styled-components':
            'styled-components/dist/styled-components.browser.cjs.js'
    }
}