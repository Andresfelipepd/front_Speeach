<template>
    <v-list>
        <v-list-item v-for="item in items" :key="item.title" link :to="item.link">
            <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
    </v-list>
</template>

<script lang="ts">
    import Vue from 'vue'
    export default Vue.extend({
        name:'Toolsection',
        data: () => ({
            ableItems: [
                'Loader',
            ],
            items: []
        }),
        mounted(){
            this.renderItems();
        },
        methods:{
            renderItems: function(){
                let Localitems = [
                    { title: 'Loader', icon: 'mdi-cloud-upload-outline',link:'loader'},
                ]
                let found;
                for (const item of this.ableItems) {
                    found = Localitems.find(Allitem => Allitem.title === item);
                    this.items.push(found)
                }
            },
        }
    })
</script>