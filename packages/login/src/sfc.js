import component from "@/login.vue";

function install(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component("Login", component);
}

component.install = install;

export default component;
