<script lang="ts" setup>
import VueJsonPretty from 'vue-json-pretty'
import {storeToRefs} from "pinia";
import {useSynoStore} from "~/stores/syno";

const synoStore = useSynoStore()
const query = ref<string>()

const {apiInfo} = storeToRefs(synoStore)

const items = computed(() => {
  if (apiInfo.value == null) {
    return []
  }
  return Object.keys(apiInfo.value).filter((it: string) => query.value == null || query.value === '' ? true : it.toLowerCase().indexOf(query.value.toLowerCase()) > -1).map((it: string) => ({
    key: it,
    data: apiInfo.value?.[it]
  }))
})
</script>

<template>
  <div class="flex flex-column gap-2">
    <label for="query">Recherche:</label>
    <InputText id="query" v-model="query"/>
  </div>

  <DataTable class="p-datatable-sm" :value="items" paginator :rows="15"
             :rows-per-page-options="[5,10,15,25,50,100]" paginator-position="both">
    <Column field="key" header="API"></Column>
    <Column field="data" header="Data">
      <template #body="props">
        <vue-json-pretty :data="props.data.data"></vue-json-pretty>
      </template>
    </Column>
  </DataTable>
</template>
