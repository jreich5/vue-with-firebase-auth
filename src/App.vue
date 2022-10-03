<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink v-if="user" to="/about">About</RouterLink>
        <RouterLink v-if="!user" to="/login">Login</RouterLink>
        <RouterLink v-if="!user" to="/signup">Signup</RouterLink>
        <a v-if="user" @click.prevent="logout" href="#">Logout</a>
      </nav>
    </div>
  </header>

  <div class="view-wrapper">
    <RouterView @login="login" @signup="signup" />
  </div>
</template>

<script setup>
import { RouterLink, RouterView, useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "@firebase/auth";

const user = ref(null);

const router = useRouter();

async function signup({ email, password }) {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch ({ code }) {
    alert(`ERROR: ${code}`);
    return;
  }
  user.value = {
    email,
  };
  router.push("/about");
}

async function login({ email, password }) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch ({ code }) {
    alert(`ERROR: ${code}`);
    return;
  }
  user.value = {
    email,
  };
  router.push("/about");
}

async function logout() {
  await signOut(auth);
  user.value = null;
  router.push("/login");
}

async function fetchUser() {
  auth.onAuthStateChanged(async (principal) => {
    if (principal === null) {
      user.value = null;
    } else {
      user.value = principal;
    }
  });
}

onMounted(fetchUser);
</script>

<style scoped>
.view-wrapper {
  margin: 0 1em;
}
nav a {
  display: inline-block;
  padding: 1em;
}
</style>
