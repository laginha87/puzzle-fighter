module.exports = {
    "roots": [
      "<rootDir>/src"
    ],
    "testRegex": "((\\.|/)(spec))\\.ts$",
    "transform": {
      "^.+\\.tsx?$": "ts-jest"
    },
    "moduleNameMapper": {
      "src/(.*)$": "<rootDir>/src/$1",
      "assets/(.*)$": "<rootDir>/__mocks__/fileMock.js",
      "tests/(.*)$": "<rootDir>/tests/$1"
    }
  }