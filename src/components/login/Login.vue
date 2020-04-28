<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat width="100%" height="100%">
            <v-row align="center" justify="center">
            </v-row>
          </v-toolbar>
          <v-card-text>
            <Loginform/>
          </v-card-text>
        </v-card>      
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import Loginform from './Loginform.vue'
export default Vue.extend({
  name: 'Login',
  components: {
    Loginform
  }
})
</script>