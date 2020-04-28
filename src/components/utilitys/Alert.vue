<template>
    <v-snackbar v-model="show.show"  :color="show.color" :timeout="show.time" width="100%" :right="x === 'right'"
 >
        <v-row class="center">
            <v-icon color="white">{{show.icon}}</v-icon>
            <v-col class="text-center" dense>{{show.text}}</v-col>
        </v-row>
    </v-snackbar>
</template>
<script lang="ts">
    import Vue from 'vue'
    export default Vue.extend({
        name: 'Alert',
        props: ['show'],
        data: () => ({
            x: "right"
        })
    })
</script>