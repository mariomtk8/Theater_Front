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

<script setup lang="ts">
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
    alert(`Error de login: ${error}`);
    console.error(error);
  }
};
</script>

<style scoped>
header {
  visibility: hidden;
}

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

form {
  max-width: 400px;
  width: 100%;
  padding: 40px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: #fff;
  text-align: center;
}

label {
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: bold;
}

input[type="text"],
input[type="password"] {
  padding: 15px;
  margin-bottom: 30px;
  border: 2px solid #ccc;
  border-radius: 6px;
  font-size: 18px;
  width: 300px;
}

button {
  cursor: pointer;
  background-color: #1E3367;
  color: white;
  padding: 18px 30px;
  margin: 10px 0;
  border: none;
  border-radius: 6px;
  font-size: 18px;
  transition: background-color 0.3s;
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
  font-size: 18px;
}

.nav__link:hover {
  text-decoration: underline;
}
</style>
