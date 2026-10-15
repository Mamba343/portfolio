module.exports = {
  extends: 'lighthouse:default',
  settings: {
    emulatedFormFactor: 'mobile',
    preset: 'perf',
    onlyCategories: ['performance','accessibility','best-practices','seo'],
  },
};
