<template>
    <div class="main-block">
        <h1>{{ $t('activities.title') }}</h1>
    </div>
    <div class="frame-VG">
        <div class="frame-VG_title">
            <h2>{{ $t('activities.guidedToursTitle') }}</h2>
        </div>
        <div class="frame-VG_txt">
            <p>{{ $t('activities.guidedToursDescription') }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
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

.frame-VG{
    display: flex;
    flex-direction: column;
    max-width: 600px;
    margin: auto; 
  }
  .frame-VG_title{
    position: relative;
    margin-bottom: 25px;
    color: #000000;
    font-size: 20px;
  }

  .frame-VG_title h2::after{
    content: "";
    width: 100%;
    position: absolute;
    height: 2px;
    display: block;
    margin: 0 auto;
    background-color: #000000;
  }
  .frame-VG_txt{
    margin-top: 3vh;
    margin-bottom: 5vh;
    font-size: 20px;
  }


</style>