<template>
    <v-container>
        <v-form v-model="valid">
            <v-row>
                <v-col cols="12">
                    <v-text-field
                        v-model="User.user"
                        :rules="[rules.required]"
                        label="Users"
                        placeholder="your user"
                    ></v-text-field>
                    <v-text-field
                        v-model="User.password"
                        :append-icon="show ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
                        :rules="[rules.required, rules.min]"
                        :type="show ? 'text' : 'password'"
                        label="Password"
                        placeholder='Password'
                        hint="At least 8 characters"
                        counter
                        @click:append="show = !show"
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-btn color='primary' :disabled="!valid" width="100%" @click="submit">Sign in</v-btn>
            </v-row>
        </v-form>
        <Alert :show="showAlert"/>
    </v-container>
</template>
<script lang="ts">
/* eslint-disable */ 
import Vue from 'vue';
import Alert from '../utilitys/Alert.vue';
import { apiLogin } from '../../globals/axiosLogin';
import{ setToken } from '../utilitys/auth';

export default Vue.extend({
    name: 'Loginform',
    components: {
        Alert
    },
    data: () => ({
        valid: false,
        show: false,
        User:{
            user: '',
            password: ''
        },
        showAlert:{
            show:false,
            color:'',
            text:'',
            time:2000
        },
        rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 4 || 'Min 8 characters'
        }
    }),
    methods: {
        submit: function(){
            apiLogin({
            method: 'POST',
            'url': `/login`,
            data: this.User
            }).then(res => {
                setToken(res.data);
                this.$router.push('/dashboard');
            })
            .catch(error=>{
                this.showAlert.show=true;
                this.showAlert.color='error';
                this.showAlert.icon = 'mdi-alert';
                this.showAlert.text=error.response ? error.response.data : error;
                this.showAlert.time=2000;
            })
        }
    },
})
</script>




