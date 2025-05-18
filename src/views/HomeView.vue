<script setup lang="ts">
import { LoggedInStore } from '@/store/loggedIn-store';


</script>

<template>
  <main>
    <div class="d-grid justify-items-center align-items-center body-container">
      <div class="container-fluid text-center ">

        <h1>ETHWAS' BLOG</h1>
        <p class="blog-text">Put your thoughts out there—smarter and faster with AI.</p>

        <div class="col" v-if="!LoggedInStore.loggedIn">

          <RouterLink to="/login" class="btn btn-outline-success me-3">Log In</RouterLink>
          <RouterLink to="/sign-up" class="btn btn-outline-success">Sign Up</RouterLink>

        </div>


      </div>
    </div>
  </main>
</template>


<style scoped>
.body-container {
  height: calc(100dvh - 80px);
  background: linear-gradient(135deg, #ffffff, #4caf50);


}

h1 {
  font-size: 140px;
  color: #2e7d32;
}

.blog-text {
  font-size: 60px;
  color: #333333;
}

@media (max-width: 766px) {
  h1 {
    font-size: 50px;
    color: #2e7d32;
  }

  .blog-text {
    font-size: 20px;
    color: #333333;
  }
}
</style>
