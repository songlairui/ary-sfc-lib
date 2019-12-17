const { resolve } = require("path");

module.exports = {
  chainWebpack: config => {
    config.resolve.alias.set("@", resolve(__dirname, "src"));
  }
};
