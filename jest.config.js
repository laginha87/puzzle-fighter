module.exports = {
    "roots": [
      "<rootDir>/src"
    ],
    "transform": {
      "^.+\\.tsx?$": "ts-jest"
    },
    "moduleNameMapper": {
      "src/(.*)$": "<rootDir>/src/$1",
      "assets/(.*)$": "<rootDir>/__mocks__/fileMock.js"
    }
  }