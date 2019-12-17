module.exports = {
  client: {
    service: {
      name: "strapi",
      // URL to the GraphQL API
      url: "https://strapi.songlairui.cn/graphql"
    },
    // Files processed by the extension
    includes: ["src/**/*.vue", "src/**/*.js"]
  }
};
