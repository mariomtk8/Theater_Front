<template>
  <Panel></Panel>
</template>

<script setup lang="ts">
import Panel from '@/components/PaneEdicion.vue';

</script>
  
<style scoped>
.admin-panel {
  background-color: #f8f9fa;
  color: #1E3367;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.funcion-container {
  margin-bottom: 20px;
  padding: 20px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.descripcion {
  margin-bottom: 10px;
}

.info-container {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
}

.info {
  margin-right: 20px;
}

.imagenes-container img {
  width: 200px;
  height: auto;
  border-radius: 5px;
  margin-bottom: 10px;
}

.buttons-container {
  display: flex;
  justify-content: flex-start;
}
.edit-button{
  margin-left: 10vh;
}

.edit-form {
  margin-top: 20px;
}

.input-field {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.button-container {
  display: flex;
  justify-content: space-between;
}

.add-function-container {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
}

.add-function-button {
  background-color: #1E3367;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.add-function-button:hover {
  background-color: #002447;
}

.save-button,
.cancel-button,
.delete-button,
.edit-button {
  padding: 8px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.save-button,
.edit-button {
  background-color: #1E3367;
  color: #fff;
}

.cancel-button,
.delete-button {
  background-color: #7e0f0f;
  color: #ffffff;
}

.save-button:hover,
.edit-button:hover,
.cancel-button:hover,
.delete-button:hover {
  background-color: #002447;
}
</style>