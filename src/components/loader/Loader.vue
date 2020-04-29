<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h1 color="primary">Cargue su archivo de audio en MP3 o WAV</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <VueFileAgent
          ref="vueFileAgent"
          :theme="'list'"
          :multiple="false"
          :deletable="true"
          :meta="true"
          :accept="'.mp3,.wav'"
          :maxSize="'100MB'"
          :maxFiles="1"
          :helpText="'Seleccione su archivo de audio'"
          :errorText="{
            type: 'Tipo de archivo invalido. Solamente archivos de audio mp3 y wav',
            size: 'Los archivos no pueden exceder los 10MB',
          }"
          v-model="fileRecords"
        ></VueFileAgent>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row>
      <h3 v-if="items.length > 0">Transcripcción</h3>
      <v-col v-for="(item, i) in items" :key="i" cols="12">
        <span>{{ item.transcript ? item.transcript : ''}}</span>
      </v-col>
    </v-row>
     <v-row>
      <h3 v-if="items.length > 0">Resumen</h3>
      <v-col v-for="(item, i) in items" :key="i" cols="12">
        <span>{{ item.summary ? item.summary : ''}}</span>
      </v-col>
    </v-row>
    <v-row justify="start">
      <v-col cols="3">
        <v-btn
          color="primary"
          width="200px"
          outlined
          :disabled="fileRecords.length == 0 || !valid"
          :loading="loading"
          @click="uploadFile"
        >Guardar audio</v-btn>
      </v-col>
      <v-col cols="3">
        <v-btn
          color="accent"
          width="200px"
          outlined
          :loading="loading"
          :disabled="valid"
          @click="fileTranscript"
        >Transcribir</v-btn>
      </v-col>
    </v-row>
    <Alert :show="alert" />
  </v-container>
</template>

<script lang="ts">
/* eslint-disable */

import Vue from "vue";
import Alert from "../utilitys/Alert.vue";
import { getName } from "../utilitys/auth";
import { backend } from "../../globals/axios";
import { FileRecord } from "vue-file-agent";
export default Vue.extend({
  name: "Loader",
  components: {
    Alert
  },
  data: () => ({
    loading: false,
    items: [],
    valid:true,
    fileRecords: [],
    alert: {
      icon: null,
      show: false,
      text: null,
      color: null
    }
  }),
  methods: {
    validate: async function() {
      backend({
        method: "GET",
        url: `/validate?speach=${this.fileRecords[0]}`,
      })
        .then(res => {
          this.valid = res.data
        })
        .catch(error => {
          this.alert = {
            icon: "mdi-alert-outline",
            show: true,
            text: error.data,
            color: "error"
          };
        });
    },
    uploadFile: async function() {
      this.loading = true;
      let fd = new FormData();
      fd.append("file", this.fileRecords[0].file);
      backend({
        method: "POST",
        url: `/upload?user=${getName()}`,
        data: fd
      })
        .then(res => {
          this.loading = false;
          this.alert = {
            icon: "mdi-check-outline",
            show: true,
            text: res.data,
            color: "success"
          };
          // this.validate();
          this.valid = false
        })
        .catch(error => {
          this.alert = {
            icon: "mdi-alert-outline",
            show: true,
            text: error.data,
            color: "error"
          };
          this.loading = false;
        });
    },
    fileTranscript: async function() {
      this.loading = true;
      let payload = {
        filename: this.fileRecords[0].file.name
      }
      backend({
        method: "POST",
        url: "/transcript",
        data: payload
      })
        .then(res => {
          console.log(res)
          this.alert = {
            icon: "mdi-check-outline",
            show: true,
            text: res.data,
            color: "success"
          };
          this.items = res.data;
          this.loading = false;
          this.valid = true;
          this.fileRecords = [];
          this.alert = {
            icon: "mdi-check-outline",
            show: true,
            text: 'data transcrita correctamente',
            color: "success"
          };
        })
        .catch(error => {
          this.loading = false;
          this.alert = {
            icon: "mdi-alert-outline",
            show: true,
            text: error.data,
            color: "error"
          };
        });
    }
  }
});
</script>
