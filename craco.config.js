const path = require('path');

module.exports = {
    webpack: {
      alias: {
        '@types': path.resolve(__dirname, './src/types/index.ts'),
      },
    },
    jest: {
      configure: {
        moduleNameMapper: {
          '^@types$': '<rootDir>/src/types/index.ts',
        },
      },
    },
  }; 