import Vue from "vue";
import VueApollo from "vue-apollo";
import VueUi from "@vue/ui";
import Login from "@/login.vue";
import apolloClient from "@/lib/apollo-client";

import "./split";

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
