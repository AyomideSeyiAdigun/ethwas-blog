<script setup lang="ts">
import { AUTH_TOKEN, LOGGED_USER_ID, WRONG_CREDENTIAL } from '@/constants/constants';
import { LoginDto } from '@/dto/login-dto';
import router from '@/router';

import { saveData } from '@/services/localStorage';
import { loginUser } from '@/services/userService';
import { LoggedInStore } from '@/store/loggedIn-store';
import { reactive, ref } from 'vue';


const loginForm = reactive(new LoginDto()) as LoginDto;
const errorMessage = ref('');
function login() {

  if (Object.values(loginForm).every(field => field?.toString().trim() !== '')) {
    const loggedIn = loginUser(loginForm)
    if (!loggedIn) {
      errorMessage.value = WRONG_CREDENTIAL;
      return;
    }
    errorMessage.value = ''
    const UserIn = saveData(AUTH_TOKEN, true);
    if (UserIn) {
      LoggedInStore.loggedIn = true;
      router.push('/draft');
      window.location.reload;
    }


  }
}


</script>

<template>
  <div class="template-full">

    <div class="container-fluid form-container">
      <form class="w-100" @submit.prevent="login">
        <p class="errorMessageText" v-if="errorMessage"> {{ errorMessage }}</p>
        <fieldset>
          <legend style=" color: #2e7d32;">Login</legend>
          <div class="mb-3">
            <label for="emailInput" class="form-label">Email</label>
            <input type="email" id="emailInput" class="form-control" placeholder="johndoe@example.com"
              v-model="loginForm.email">
          </div>
          <div class="mb-3">
            <label for="passwordInput" class="form-label">Password</label>
            <input type="password" id="passwordInput" class="form-control" placeholder="*******"
              v-model="loginForm.password">
          </div>
          <button type="submit" class="btn btn-success" @click="login">Submit</button>
        </fieldset>
      </form>

      <div class="row">
        <div class="col justify-items-center ">
          <p>Don’t have an account yet? <RouterLink to="/sign-up" style="color: darkgreen;">Sign Up </RouterLink>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.template-full {
  background: linear-gradient(135deg, #e8f5e9, #a5d6a7);
  height: calc(100dvh - 80px);


}

.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 70px;
  width: 500px;

}

.errorMessageText {
  width: 100%;
  text-align: center;
  color: red;
  font-size: large;

}

label {
  color: #19471b;
}
</style>
