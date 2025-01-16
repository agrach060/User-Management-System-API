module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    setupFiles: ['<rootDir>/jest.setup.js'],
    transform: {
        '^.+\\.ts$': [
            'ts-jest',
            {
                isolatedModules: true,
            },
        ],
    },
    moduleFileExtensions: ['ts', 'js', 'json'],
};
