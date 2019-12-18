import Vue from "vue";
import VueApollo from "vue-apollo";
import VueUi from "@vue/ui";
import apolloClient from "@/lib/apollo-client";

import Login from "./sfc";

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
});

Vue.use(Login);

Vue.use(VueUi);
Vue.use(VueApollo);

new Vue({
  el: "#app",
  apolloProvider
});
