<script lang="ts" setup>
import {ref} from "vue";
import {filesize} from "filesize";
import {Pausable, useIntervalFn} from "@vueuse/core";
import {useSynoStore} from "~/stores/syno";

const {fetchMonitoringProcesses} = useSynoStore()

let intervalMonitor: Pausable
const processes = ref<any[]>()

const getProcesses = async () => {
  processes.value = await fetchMonitoringProcesses()
}

onMounted(async () => {
  await getProcesses()

  intervalMonitor = useIntervalFn(async () => {
    await getProcesses()
  }, 3000)
})

onBeforeRouteLeave(() => {
  intervalMonitor.pause()
})
</script>

<template>
  <DataTable :rows="15" :rows-per-page-options="[5,10,15,25,50,100]" :value="processes" class="p-datatable-sm" paginator paginator-position="both" scrollHeight="flex" scrollable>
    <Column :sortable="true" field="command" header="Nom du processus"></Column>
    <Column :sortable="true" field="pid" header="ID du processus"></Column>
    <Column :sortable="true" field="status" header="Statut">
      <template #body="props">
        <div class="white-space-nowrap">
          <span v-if="props.data.status === 'R'">En cours d'exécution</span>
          <span v-else-if="props.data.status === 'S'">En veille</span>
        </div>
      </template>
    </Column>
    <Column :sortable="true" field="cpu" header="Processeur(%)">
      <template #body="props">
        <span>{{ props.data.cpu / 10 }}</span>
      </template>
    </Column>
    <Column :sortable="true" field="mem" header="Mémoire privée">
      <template #body="props">
        <span>{{ filesize((props.data.mem - props.data.mem_shared) * 1000) }}</span>
      </template>
    </Column>
    <Column :sortable="true" field="mem_shared" header="Mémoire partagée">
      <template #body="props">
        <span>{{ filesize(props.data.mem_shared * 1000) }}</span>
      </template>
    </Column>
  </DataTable>
</template>
