import Vue from "vue";
import VueApollo from "vue-apollo";
import VueUi from "@vue/ui";
import apolloClient from "@/lib/apollo-client";

import Login from "./sfc";

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
});
const defaultUse = () => {
  Vue.use(Login);
  Vue.use(VueUi);
  Vue.use(VueApollo);
};

const customLoad = (id = "#app", pre = defaultUse) => {
  defaultUse();
  return new Vue({
    el: id,
    apolloProvider
  });
};

export { VueApollo, apolloClient, VueUi, defaultUse, customLoad };

export default customLoad;
