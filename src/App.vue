<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <TerapiaDigital msg="Welcome to Terapia Digital App"/>
</template>

<script>
import TerapiaDigital from './components/TerapiaDigital.vue'

export default {
  name: 'App',
  components: {
    TerapiaDigital
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
