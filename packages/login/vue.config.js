const { resolve } = require("path");

module.exports = {
  chainWebpack: config => {
    config.resolve.alias.set("@", resolve(__dirname, "src"));

    config.module
      .rule("gql")
      .test(/\.(gql|graphql)$/)
      .use("gql-loader")
      .loader("graphql-tag/loader")
      .end();
  }
};
