const express = require("express");
const expressGraphQL = require("express-graphql");
const { buildSchema } = require("graphql");

const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

const rootValue = {
  hello: () => {
    return "hello vrs";
  }
};

const app = express();

app.use(
  "*",
  expressGraphQL({
    schema,
    rootValue,
    graphiql: true
  })
);

module.exports = app;
