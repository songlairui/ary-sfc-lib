
<template>
  <div class="login">
    <template v-if="!jwt">
      <VueInput class="accent" v-model="identifier" placeholder="Username" />
      <VueInput class="accent" v-model="password" placeholder="Password" type="password" />

      <button @click="login" class="primary" icon-left="flag">Login</button>
      <VueLoadingIndicator v-if="loading" />
    </template>
    <template v-else>
      <button @click="jwt = ''">Logout</button>
    </template>
  </div>
</template>
<script>
import gql from "graphql-tag";

export default {
  name: "Login", // vue component name
  data() {
    return {
      counter: 5,
      initCounter: 5,
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
          mutation: gql`
            mutation Login($identifier: String!, $password: String!) {
              login(input: { identifier: $identifier, password: $password }) {
                jwt
              }
            }
          `,
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
      } catch (error) {}
      this.loading = false;
    }
  }
};
</script>