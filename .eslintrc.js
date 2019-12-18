module.exports = {
  root: true,
  env: {
    es6: true,
    node: true
  },
  'extends': [
    'plugin:@typescript-eslint/recommended',
    'standard'
  ],
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    '@typescript-eslint/member-delimiter-style': ['error', { // Prevents us from using any delimiter for interface properties.
      'multiline': {
        'delimiter': 'none',
        'requireLast': false
      },
      'singleline': {
        'delimiter': 'comma',
        'requireLast': false
      }
    }],
    '@typescript-eslint/indent': 'off', // This is the job of StandardJS, they are competing rules so we turn off the Typescript one.
    '@typescript-eslint/no-explicit-any': 'off'
  },
  plugins: [
    '@typescript-eslint'
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser'
  }
}
