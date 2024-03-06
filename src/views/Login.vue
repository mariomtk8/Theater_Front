<template>
  <div class="login-container">
    <form @submit.prevent="login">
      <div>
        <label for="username">Username:</label>
        <input v-model="username" type="text" id="username" required>
      </div>
      <div>
        <label for="password">Password:</label>
        <input v-model="password" type="password" id="password" required>
      </div>
      <button type="submit">Login</button>
      <RouterLink to="/Index" class="nav__link">Entrar sin iniciar Sesion</RouterLink>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useLoginStore } from '../store/Login';

const username = ref('');
const password = ref('');
const loginStore = useLoginStore();
const router = useRouter();

const login = async () => {
  try {
    if (username.value.toLowerCase() === 'admin') {
      await loginStore.loginAdmin(username.value, password.value);
      router.push('/Admin');
    } else {
      await loginStore.loginUser(username.value, password.value);
      router.push('/Index');
    }
  } catch (error) {
    alert(`Error de login: ${error.message}`);
    console.error(error);
  }
};
</script>
<style scoped>
header{
  visibility: hidden;
}

.login-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: #fff;
}

.login-container form {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 5px;
  font-size: 16px;
  font-weight: bold;
  margin-right: 5vh;
}

input[type="text"],
input[type="password"] {
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  cursor: pointer;
  background-color: #1E3367;
  color: white;
  padding: 15px 20px;
  margin: 5px 0;
  border: none;
  border-radius: 4px;
  transition: 0.3s;
}

button:hover {
  background-color: #45a049;
}

.nav__link {
  display: block;
  text-align: center;
  margin-top: 20px;
  text-decoration: none;
  color: #333;
}

.nav__link:hover {
  text-decoration: underline;
}
</style>