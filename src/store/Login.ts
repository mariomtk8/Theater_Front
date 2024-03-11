import { defineStore } from 'pinia';

export const useLoginStore = defineStore('login', {
  state: () => ({
    user: null,
    admin: null,
  }),
  actions: {
    async loginUser(username: string, password: string) {
      try {
        const response = await fetch(`http://a3407cd44c6db427eb6fd4e572e5b3ab-889807298.us-east-1.elb.amazonaws.com/Usuario/${username}/Contrasena/${password}`);
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
        const response = await fetch(`http://a3407cd44c6db427eb6fd4e572e5b3ab-889807298.us-east-1.elb.amazonaws.com/Admin/${username}/Contrasena/${password}`);
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
