<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { reactive, ref, watch } from 'vue';
import { RegisterDto } from '@/dto/login-dto';
import { EXISTING_USER, FIELD_ERROR, PASSWORD_ERROR, SUCCESS_MESSAGE } from '@/constants/constants';
import router from '@/router';
import { saveUser } from '@/services/userService';

const registerForm = reactive(new RegisterDto()) as RegisterDto;
const rePassword = ref('');
const passwordMatch = ref(false);
const errorMessage = ref('');
const successMessage = ref('');
const requiredFields: Array<keyof RegisterDto> = ['email', 'firstName', 'lastName', 'password'];

watch(rePassword, () => {
  if (rePassword.value === registerForm.password) {
    passwordMatch.value = true
  } else {
    passwordMatch.value = false;
  }

});

const displayErrorMessageIfUserExist = () => {
  setTimeout(() => {
    errorMessage.value = '';
  }, 1000);
  errorMessage.value = EXISTING_USER;
}

const displaySuccessMessageIfUserDoesExist = () => {
  successMessage.value = SUCCESS_MESSAGE
  setTimeout(() => {
    router.push('/login');

    window.location.reload;

  }, 1000)
}

const submitForm = () => {
  if (requiredFields.every((key) => registerForm[key]?.toString().trim() !== '') && passwordMatch.value) {
    errorMessage.value = '';
    const registerUser = saveUser(registerForm);
    if (!registerUser) {
      displayErrorMessageIfUserExist()
      return;
    }
    displaySuccessMessageIfUserDoesExist();
  } else {
    errorMessage.value = passwordMatch.value ? FIELD_ERROR : PASSWORD_ERROR;
    return;
  }
}

</script>

<template>
  <div class="template-full">


    <div class="container-fluid form-container">
      <form class="w-100" @submit.prevent="submitForm">
        <fieldset>
          <p class="errorMessageText"
            v-if="(errorMessage === PASSWORD_ERROR && !passwordMatch) || (errorMessage === FIELD_ERROR) || (errorMessage === EXISTING_USER)">
            {{ errorMessage }}</p>
          <p class="successMessageText" v-if="successMessage">{{ successMessage }}</p>
          <legend style=" color: #2e7d32;">Sign up</legend>

          <div class="mb-3">
            <div class="row">
              <div class="col-md-6">

                <label for="FNameInput" class="form-label">First Name</label>
                <input type="text" id="FNameInput" class="form-control" placeholder="Jon"
                  v-model="registerForm.firstName">
              </div>
              <div class="col-md-6">

                <label for="LNameInput" class="form-label">Last Name</label>
                <input type="text" id="LNameInput" class="form-control" placeholder="Doe"
                  v-model="registerForm.lastName">
              </div>
            </div>

          </div>
          <div class="mb-3">
            <label for="emailInput" class="form-label">Email</label>
            <input type="email" id="emailInput" class="form-control" placeholder="johndoe@example.com"
              v-model="registerForm.email">
          </div>
          <div class="mb-3">
            <label for="passwordInput" class="form-label">Password</label>
            <input type="password" id="passwordInput" class="form-control" placeholder="*******"
              v-model="registerForm.password">
          </div>

          <div class="mb-3">
            <label for="password2Input" class="form-label">Re-Password</label>
            <input type="password" id="password2Input" class="form-control" placeholder="*******" v-model="rePassword">
          </div>

          <button type="submit" class="btn btn-success">Submit</button>
        </fieldset>
      </form>

      <div class="row">
        <div class="col justify-items-center ">
          <p>Already have an Account? <RouterLink to="/login" style="color: darkgreen;">Log In</RouterLink>
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

  width: 500px;
  padding-top: 70px;

}

.errorMessageText {
  width: 100%;
  text-align: center;
  color: red;
  font-size: large;

}

.successMessageText {
  width: 100%;
  text-align: center;
  color: green;
  font-size: large;
}

label {
  color: #19471b;
}
</style>
