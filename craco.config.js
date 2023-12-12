const path = require('path');

module.exports = {
    webpack: {
      alias: {
        '@types': path.resolve(__dirname, './src/types/index.ts'),
        '@api': path.resolve(__dirname, './src/api/index.ts'),
        '@components': path.resolve(__dirname, './src/components/index.ts'),
        '@hooks': path.resolve(__dirname, './src/hooks/index.ts'),
        '@constants': path.resolve(__dirname, './src/constants.ts'),
      },
    },
    jest: {
      configure: {
        moduleNameMapper: {
          '^@types$': '<rootDir>/src/types/index.ts',
          '^@api$': '<rootDir>/src/api/index.ts',
          '^@components$': '<rootDir>/src/components/index.ts',
          '^@hooks$': '<rootDir>/src/hooks/index.ts',
          '^@constants$': '<rootDir>/src/constants.ts',
        },
      },
    },
  }; 