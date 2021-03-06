import Vue from "vue";
import VueApollo from "vue-apollo";
import VueUi from "@vue/ui";
import Login from "@/login.vue";
import apolloClient from "@/lib/apollo-client";
import "@vue/ui/dist/vue-ui.css";
import "./index.css";

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
    return h("div", { class: "app" }, [h(Login)]);
  }
});
