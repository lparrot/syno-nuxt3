<script lang="ts" setup>
import {useSynoStore} from "~/stores/syno";

const {fetchLogs} = useSynoStore()
const log_result: any = await fetchLogs({
  start: 0,
  limit: 99999999,
  target: 'LOCAL',
  logtype: 'system,netbackup',
  date_from: 0,
  date_to: 0,
  keyword: '',
  level: ''
})
</script>

<template>
  <DataTable class="p-datatable-sm" :value="log_result.items" scrollable scrollHeight="flex">
    <Column field="level" header="Niveau"></Column>
    <Column field="logtype" header="Journal"></Column>
    <Column header="Heure">
      <template #body="props">
        <div class="white-space-nowrap">{{props.data.time}}</div>
      </template>
    </Column>
    <Column field="who" header="Utilisateur"></Column>
    <Column field="descr" header="Evènement"></Column>
  </DataTable>
</template>
