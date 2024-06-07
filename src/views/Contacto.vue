<template>
    <div class="main-block">
            <h1>Contacto</h1>
        </div>
    <ContactComp></ContactComp>
</template>

<script setup lang="ts">
import ContactComp from '@/components/Contact-Comp.vue'
</script>

<style scoped>
    
    .main-block {
        display: flex;
        align-items: center;
        justify-content: start;
        width: 100%;
        background-color: #1E3367;
        height: 13vh;
        margin-bottom: 10vh;
      }
    
      .main-block h1 {
        color: white;
        font-size: xx-large;
        margin-left: 20vh;
      }

</style>