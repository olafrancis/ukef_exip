const CONTENT_STRINGS = require('../../content-strings');
const { TEMPLATES } = require('../../constants');

const get = (req, res) =>
  res.render(TEMPLATES.PROBLEM_WITH_SERVICE, {
    CONTENT_STRINGS: CONTENT_STRINGS.PROBLEM_WITH_SERVICE_PAGE,
  });

module.exports = get;
