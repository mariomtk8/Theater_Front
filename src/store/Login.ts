import { defineStore } from 'pinia';

export const useLoginStore = defineStore('login', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user') || 'null'),
    admin: JSON.parse(localStorage.getItem('admin') || 'null'),
  }),
  actions: {
    async loginUser(username: string, password: string) {
      try {
        const response = await fetch(`/api/Usuario/${username}/Contrasena/${password}`);
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        const data = await response.json();
        this.user = data; 
        localStorage.setItem('user', JSON.stringify(data));
        localStorage.removeItem('admin'); 
        return data;
      } catch (error) {
        console.error('Error logging in user', error);
        throw error;
      }
    },
    async loginAdmin(username: string, password: string) {
      try {
        const response = await fetch(`/api/Admin/${username}/Contrasena/${password}`);
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        const data = await response.json();
        this.admin = data; 
        localStorage.setItem('admin', JSON.stringify(data));
        localStorage.removeItem('user');
        return data;
      } catch (error) {
        console.error('Error logging in admin', error);
        throw error;
      }
    },
    logout() {
      this.user = null;
      this.admin = null;
      localStorage.removeItem('user');
      localStorage.removeItem('admin');
    }
  },
});
