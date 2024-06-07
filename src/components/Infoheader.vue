<template>
    <div class="main-block">
        <h1>{{ $t('information.title') }}</h1>
    </div>
    <div class="frame-Thorario">
        <div class="frame-Thorario_title">
            <h2>{{ $t('information.ticketOfficeHoursTitle') }}</h2>
        </div>
        <div class="frame-Thorario_txt">
            <p>{{ $t('information.ticketOfficeHoursDescription') }}</p>
        </div>
    </div>
    <div class="frame-Thorario">
        <div class="frame-Thorario_title">
            <h2>{{ $t('information.customerServiceTitle') }}</h2>
        </div>
        <div class="frame-Thorario_txt">
            <p>{{ $t('information.customerServiceDescription') }}</p>
        </div>
    </div>
    <div class="frame-Thorario">
        <div class="frame-Thorario_title">
            <h2>{{ $t('information.facilityConditionsTitle') }}</h2>
        </div>
        <div class="frame-Thorario_txt">
            <p>{{ $t('information.facilityConditionsDescription') }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
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

.frame-Thorario{
    display: flex;
    flex-direction: column;
    max-width: 600px;
    margin: auto; 
  }
  .frame-Thorario_title{
    position: relative;
    margin-bottom: 25px;
    color: #000000;
    font-size: 20px;
  }

  .frame-Thorario_title h2::after{
    content: "";
    width: 100%;
    position: absolute;
    height: 2px;
    display: block;
    margin: 0 auto;
    background-color: #000000;
  }
  .frame-Thorario_txt{
    margin-top: 3vh;
    margin-bottom: 5vh;
    font-size: 20px;
  }
</style>