async function main() {
  const [
    { default: Vue },
    { default: VueApollo },
    { default: VueUi },
    { default: apolloClient },
    { default: Login }
  ] = await Promise.all([
    import("vue"),
    import("vue-apollo"),
    import("@vue/ui"),
    import("@/lib/apollo-client"),
    import("./sfc")
  ]);

  Vue.use(Login);

  Vue.use(VueUi);
  Vue.use(VueApollo);

  const apolloProvider = new VueApollo({
    defaultClient: apolloClient
  });

  // const app =
  new Vue({
    el: "#app",
    apolloProvider,

    render(h) {
      return h(Login);
    }
  });
}

main();
