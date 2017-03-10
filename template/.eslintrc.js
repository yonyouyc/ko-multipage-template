module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    'no-new': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 1 : 0,
    'new-cap': 0,
    "no-console": 0,
    "no-return-assign": 0,
    "eqeqeq": 0,
    "no-fallthrough": 0,
    "comma-dangle": ["error", {
        "arrays": "ignore",
        "objects": "ignore",
        "imports": "never",
        "exports": "never",
        "functions": "never"
    }]
  }
}
