<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="onSubmit">
      <input v-model="email" type="email" placeholder="Enter email" />
      <br />
      <input v-model="password" type="password" placeholder="Enter password" />
      <br />
      <button>Login</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
const email = ref("");
const password = ref("");
const emit = defineEmits(["login"]);

function onSubmit() {
  const user = {
    email: email.value,
    password: password.value,
  };
  emit("login", user);
}
</script>

<style lang="scss" scoped></style>
