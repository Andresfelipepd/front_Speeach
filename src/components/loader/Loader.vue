<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h1>Cargue su archivo de audio en MP3 o WAV</h1>
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
          @select="filesSelected($event)"
          @delete="fileDeleted($event)"
          v-model="fileRecords"
        ></VueFileAgent>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row>
      <v-col v-for="(item, i) in items" :key="i" cols="12">
        <span>{{item.transcript ? item.transcript : ''}}</span>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <v-btn
          color="primary"
          :loading="loading"
          :disabled="fileRecords.length == 0"
          @click="uploadFiles()"
        >Subir a la nube</v-btn>
      </v-col>
      <v-col cols="6">
        <v-btn color="secondary" :disabled="this.filename.length > 5" :loading="loading" @click="fileTranscript()">Transcribir</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
/* eslint-disable */
import Vue from "vue";
import { getToken } from "../utilitys/auth";
import { BACKEND } from "../../globals/constans";
import { api1 } from "../../globals/axios";
export default Vue.extend({
  name: "Loader",
  data: () => ({
    loading: false,
    items: [],
    fileRecords: [],
    uploadUrl: `${BACKEND}/upload`,
    uploadHeaders: { Authorization: `Bearer ${getToken()}` },
    fileRecordsForUpload: [],
    filename: ""
  }),
  methods: {
    uploadFiles: async function() {
      (this.loading = true),
        this.$refs.vueFileAgent
          .upload(this.uploadUrl, this.uploadHeaders, this.fileRecordsForUpload)
          .then(res => {
            this.loading = false;
            console.log(res);
          })
          .catch(error => {
            console.log(error);
            this.loading = false;
          });
    },
    TranscriptFiles: async function() {
      api1({
        method: "POST",
        url: `/transcript`,
        data: this.filename
      })
        .then(res => {
          this.items = res[0].data;
          this.fileRecordsForUpload = [];
          this.loading = false;
          this.fileRecords = [];
        })
        .catch(error => {
          console.log(error);
          this.loading = false;
        });
    },
    deleteUploadedFile: function(fileRecord) {
      this.$refs.vueFileAgent.deleteUpload(
        this.uploadUrl,
        this.uploadHeaders,
        fileRecord
      );
    },
    filesSelected: function(fileRecordsNewlySelected) {
      var validFileRecords = fileRecordsNewlySelected.filter(
        fileRecord => !fileRecord.error
      );
      this.fileRecordsForUpload = this.fileRecordsForUpload.concat(
        validFileRecords
      );
    },
    fileDeleted: function(fileRecord) {
      var i = this.fileRecordsForUpload.indexOf(fileRecord);
      if (i !== -1) {
        this.fileRecordsForUpload.splice(i, 1);
      } else {
        this.deleteUploadedFile(fileRecord);
      }
    }
  }
});
</script>
