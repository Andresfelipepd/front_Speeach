<template>
    <v-list>
        <v-list-item link to="home">
        <v-list-item-avatar>
          <v-avatar dark color='primary'>{{ user[0]+user[1] }}</v-avatar>
        </v-list-item-avatar>
        <v-list-item-title>{{ user }}</v-list-item-title>
        </v-list-item>
        <v-list-item @click="logout()">
            <v-list-item-action>
            <v-icon>mdi-logout</v-icon>
            </v-list-item-action>
            <v-list-item-content>
            <v-list-item-title>
                Logout
            </v-list-item-title>
            </v-list-item-content>  
        </v-list-item>
    </v-list>
</template>

<script lang="ts">
    import Vue from 'vue'
    import { logout, getName } from '../utilitys/auth'
    export default Vue.extend({
        name:'Usersection',
        data: () => ({
            user: getName(),
        }),
        methods:{
            logout: function(){
               logout()
            }
        }
    })
</script>