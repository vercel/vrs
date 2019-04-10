/**
 * Created by shu on 7/5/2017.
 * Refactored by coetry on 3/25/2019
 */

const withLess = require("@zeit/next-less");
const withCSS = require("@zeit/next-css");

module.exports = withCSS(
  withLess({
    target: "serverless"
  })
);
