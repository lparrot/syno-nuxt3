<script lang="ts" setup>
import VueJsonPretty from 'vue-json-pretty'
import {apiInfos} from "~/composables/useSynoApi";

const query = ref<string>()
const infos = ref()

infos.value = apiInfos

const items = computed(() => {
  if (infos.value == null) {
    return []
  }
  return Object.keys(infos.value).filter(it => query.value == null || query.value === '' ? true : it.toLowerCase().indexOf(query.value.toLowerCase()) > -1).map(it => ({
    key: it,
    data: infos.value[it]
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
