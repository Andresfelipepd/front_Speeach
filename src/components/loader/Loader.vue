<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h1>load your audios</h1>
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
          :helpText="'Choose your audio files'"
          :errorText="{
            type: 'Invalid file type. Only audio mp3 and wav files',
            size: 'Files should not exceed 10MB in size',
          }"
          @select="filesSelected($event)"
          @delete="fileDeleted($event)"
          v-model="fileRecords"
        ></VueFileAgent>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-container>
      <v-col v-for="(item, i) in items" :key="i" cols="12">
        <span>{{item.transcript ? item.transcript : ''}}</span>
      </v-col>
    </v-container>
    <v-row>
      <v-col cols="12">
        <v-btn
          color="primary"
          :loading="loading"
          :disabled="!fileRecordsForUpload.length"
          @click="uploadFiles()"
        >Upload {{ fileRecordsForUpload.length }} files</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
/* eslint-disable */
import Vue from "vue";
import { getToken } from "../utilitys/auth";
import { BACKEND } from "../../globals/constans";
export default Vue.extend({
  name: "Loader",
  data: () => ({
    loading: false,
    items: [],
    fileRecords: [],
    uploadUrl: `${BACKEND}/upload`,
    uploadHeaders: { Authorization: `Bearer ${getToken()}` },
    fileRecordsForUpload: []
  }),
  methods: {
    uploadFiles: async function() {
      (this.loading = true),
        this.$refs.vueFileAgent
          .upload(this.uploadUrl, this.uploadHeaders, this.fileRecordsForUpload)
          .then(res => {
            this.items = res[0].data;
            console.log(res);
            this.fileRecordsForUpload = [];
            this.loading = false;
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
