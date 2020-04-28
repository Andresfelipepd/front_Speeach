<template>
  <v-app id="keep">
    <router-view/>
  </v-app>
</template>

<script>
  export default {
    name: 'App'
  };
</script>

<style lang="scss" scoped>
  #keep .v-navigation-drawer__border {
    display: none
  }
</style>