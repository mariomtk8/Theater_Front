import { defineStore } from 'pinia';

export const useLoginStore = defineStore('login', {
  state: () => ({
    user: null,
    admin: null,
  }),
  actions: {
    async loginUser(username: string, password: string) {
      try {
        const response = await fetch(`api/Usuario/${username}/Contrasena/${password}`);
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        const data = await response.json();
        this.user = data; 
        return data;
      } catch (error) {
        console.error('Error logging in user', error);
        throw error;
      }
    },
    async loginAdmin(username: string, password: string) {
      try {
        const response = await fetch(`api/Admin/${username}/Contrasena/${password}`);
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        const data = await response.json();
        this.admin = data; 
        return data;
      } catch (error) {
        console.error('Error logging in admin', error);
        throw error;
      }
    },
  },
});
