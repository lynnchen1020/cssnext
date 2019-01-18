module.exports = {
  chainWebpack: config => {
    // GraphQL Loader
    config.module
      .rule("pug")
      .test(/\.pug$/)
      .use("pug-plain-loader")
      .loader("pug-plain-loader")
      .end();
  }
};
