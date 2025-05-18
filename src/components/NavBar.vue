<script setup lang="ts">
import { AUTH_TOKEN } from '@/constants/constants';
import router from '@/router';

import { getAllSavedData, logUserOut } from '@/services/localStorage';
import { LoggedInStore } from '@/store/loggedIn-store';

const logOut = () => {
  logUserOut();
  router.push('/login');
  window.location.reload();
}
import { onMounted } from 'vue'

onMounted(() => {
  checkIfUserIsLoggedIn();
})


const checkIfUserIsLoggedIn = () => {
  const getToken = getAllSavedData(AUTH_TOKEN);
  if (getToken) {
    LoggedInStore.loggedIn = true;
  } else {
    LoggedInStore.loggedIn = false;
  }
}


</script>




<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark  p-4">
    <div class="container-fluid">
      <RouterLink to="/" class="navbar-brand" style="color: #2e7d32;">ETHWAS'BLOG</RouterLink>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02"
        aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <RouterLink to="/" class="nav-link">Home</RouterLink>
          </li>
          <li class="nav-item" v-if="LoggedInStore.loggedIn">
            <RouterLink to="/Draft" class="nav-link">Draft</RouterLink>
          </li>
        </ul>
        <div class="d-flex gap-4">

          <button to="/login" class="btn btn-outline-success" @click="logOut" v-if="LoggedInStore.loggedIn">Log
            Out</button>
          <RouterLink to="/login" class="btn btn-outline-success" v-if="!LoggedInStore.loggedIn">Log In</RouterLink>
          <RouterLink to="/sign-up" class="btn btn-outline-success" v-if="!LoggedInStore.loggedIn">Sign Up</RouterLink>

        </div>
      </div>
    </div>
  </nav>




</template>


<style scoped></style>
