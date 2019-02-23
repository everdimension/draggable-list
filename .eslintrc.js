module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['airbnb', 'plugin:prettier/recommended', 'prettier/react'],
  env: {
    browser: true,
    node: true,
  },
  rules: {
    'react/jsx-filename-extension': 0,
    'import/prefer-default-export': 0,
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: ['scripts/*.js', 'webpack.config.js', 'doczrc.js'] },
    ],
  },
  overrides: [
    {
      /**
       * eslint still cannot work with typescript correctly
       * out of the box
       * https://github.com/typescript-eslint/typescript-eslint/issues/301#issue-412343397
       * So we need to disable rules which don't make sense or are incompatible
       * with typescrpit
       */
      files: ['*.ts', '*.tsx'],
      rules: {
        // because typescript doesn't allow to specify extensions
        'import/no-unresolved': 0,
        // because sometimes we import things only as types,
        // and tsc has a "no-unused-locals" rule anyway
        'no-unused-vars': 0,
        // because we use typescript's type system
        'react/prop-types': 0,
      },
    },
  ],
};
