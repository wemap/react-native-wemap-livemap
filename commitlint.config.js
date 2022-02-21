module.exports = {
  extends: ['@commitlint/config-conventional'],
  defaultIgnores: true,
  rules: {
    'subject-case': [2, 'always', ['sentence-case', 'start-case', 'pascal-case', 'upper-case']],
  },
};
