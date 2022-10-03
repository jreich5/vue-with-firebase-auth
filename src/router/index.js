import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import SignupView from "../views/SignupView.vue";
import AboutView from "../views/AboutView.vue";
import { auth } from "../firebase";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/signup",
      name: "/signup",
      component: SignupView,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/about",
      name: "about",
      component: AboutView,
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth !== undefined) {
    if (auth.currentUser && to.meta.requiresAuth) {
      next();
    } else if (auth.currentUser && !to.meta.requiresAuth) {
      router.push("/about");
    } else if (!auth.currentUser && to.meta.requiresAuth) {
      router.push("/login");
    } else if (!auth.currentUser && !to.meta.requiresAuth) {
      next();
    }
  } else {
    next();
  }
});

export default router;
