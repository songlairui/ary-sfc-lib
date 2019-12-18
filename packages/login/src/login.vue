
<template>
  <div class="login">
    <VueButton v-if="!jwt" @click="open = true">登 陆</VueButton>
    <VueDropdown :label="`[${identifier}]`" button-class="accent" v-else>
      <VueDropdownButton class="accent" @click="jwt = ''" icon-left="delete">登出</VueDropdownButton>
      <VueDropdownButton class="accent" icon-left="lock" keep-open>Keep open</VueDropdownButton>
    </VueDropdown>
    <!-- <div class="row">
      <VueSwitch v-model="locked" class="right">Locked</VueSwitch>
    </div>-->
    <VueModal v-if="open" title="Login" :locked="locked" class="small" @close="open = false">
      <div class="default-body">
        <VueFormField title="Username or email">
          <VueInput class="accent" v-model="identifier" placeholder="Username" />
        </VueFormField>

        <VueFormField>
          <VueInput class="accent" v-model="password" placeholder="Password" type="password" />
          <span slot="subtitle">{{ !password ? ' ':'Password'}}</span>
        </VueFormField>
      </div>

      <div slot="footer" class="actions">
        <VueButton class="primary" @click="open = false">Close</VueButton>
        <VueButton
          class="primary"
          icon-left="flag"
          @click="login"
          :loading-secondary="loading"
        >Login</VueButton>
      </div>
    </VueModal>
  </div>
</template>
<script>
import LOGIN from "./LOGIN.gql";

// const LOGIN = {};
// console.info("LOGIN", LOGIN);

export default {
  name: "Login", // vue component name
  data() {
    return {
      open: false,
      locked: false,
      password: "",
      identifierRaw: localStorage.getItem("_USER_") || "",
      jwtRaw: localStorage.getItem("_AUTH_") || "",
      loading: false
    };
  },
  computed: {
    identifier: {
      get() {
        return this.identifierRaw;
      },
      set(val) {
        this.identifierRaw = val;
        localStorage.setItem("_USER_", val);
      }
    },
    jwt: {
      get() {
        return this.jwtRaw;
      },
      set(val) {
        this.jwtRaw = val;
        localStorage.setItem("_AUTH_", val);
      }
    }
  },
  methods: {
    log(payload) {
      console.warn(payload);
    },
    async login() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      try {
        const { data } = await this.$apollo.mutate({
          // Query
          mutation: LOGIN,
          // Parameters
          variables: {
            identifier: this.identifier,
            password: this.password
          }
        });
        const {
          login: { jwt }
        } = data || {};
        this.jwt = jwt;
        this.open = false;
      } catch (error) {
        //
      }
      this.loading = false;
    }
  }
};
</script>

<style lang='css'>
.row {
  padding: 5px 0;
}
</style>