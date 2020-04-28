<template>
  <v-container>
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-subheader class="mt-4 grey--text text--ligth-1">Perfil</v-subheader>
      <usersection />

      <v-subheader class="mt-4 grey--text text--ligth-1">Tools</v-subheader>
      <toolsection />
    </v-navigation-drawer>

    <v-app-bar app clipped-left color="primary" dark>
      <v-toolbar-title>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" color="white"></v-app-bar-nav-icon>
        <span>Speach recognition tool</span>
      </v-toolbar-title>
      <div class="flex-grow-1"></div>
    </v-app-bar>

    <v-content>
        <router-view />
    </v-content>
  </v-container>
</template>


<script lang="ts">
import Vue from "vue";
import Usersection from "./Usersection.vue";
import Toolsection from "./Toolsection.vue";
export default Vue.extend({
  name: "Dashboard",
  components: {
    Usersection,
    Toolsection
  },
  data: () => ({
    drawer: null
  })
});
</script>
