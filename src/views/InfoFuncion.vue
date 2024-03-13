<template>
    <Informacion></Informacion>
</template>

<script setup lang="ts">
import Informacion from '@/components/Informacion.vue'
</script>

<style scoped>
body,
h1,
h2,
p,
ul,
li,
a {
    margin: 0;
    padding: 0;
    text-decoration: none;
}

body {
    font-family: 'Roboto';
    line-height: 1.6;
    overflow: auto;
}

/*---------Header--------*/

.main-block {
    display: flex;
    align-items: center;
    justify-content: start;
    width: 100%;
    background-color: #1E3367;
    height: 13vh;
    margin-bottom: 10vh;
}

.main-block__title {
    color: white;
    font-size: xx-large;
    margin-left: 20vh;
}



@media screen and (max-width: 1150px) {

    .header {
        margin-top: 5vh;
        display: flex;
        height: auto;
        text-align: center;
        margin-bottom: 5vh;
    }

    .header__logo {
        margin-left: 5vh;
    }

    .header__nav {
        flex-direction: column;
        align-items: center;
        text-align: center;
        margin-top: 10px;
    }

    main {
        margin: 0 15px;
    }

    


    .main-block h1 {
        margin-left: 6vh;
    }

    

}
</style>
