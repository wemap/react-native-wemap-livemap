// const DISABLED = 0;
const WARNING = 1;
const ERROR = 2;

module.exports = {
  extends: ['@commitlint/config-conventional'],
  parserPreset: {
    parserOpts: {
      referenceActions: null,
      issuePrefixes: ['#'],
    },
  },
  rules: {
    'body-max-line-length': [ERROR, 'always', 130],
    'footer-max-line-length': [ERROR, 'always', 130],
    'header-max-length': [ERROR, 'always', 130],
    'references-empty': [WARNING, 'never'],
    'type-enum': [
      ERROR,
      'always',
      [
        'build',
        'chore',
        'deploy',
        'docs',
        'feat',
        'fix',
        'improvement',
        'perf',
        'refactor',
        'revert',
        'test',
      ],
    ],
  },
};
