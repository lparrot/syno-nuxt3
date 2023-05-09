<script lang="ts" setup>
import {ref} from "vue";
import {filesize} from "filesize";
import {Pausable, useIntervalFn} from "@vueuse/core";

const {fetchProcesses} = useSynoHelpers()

let intervalMonitor: Pausable
const processes = ref<any[]>()

const getProcesses = async () => {
  processes.value = await fetchProcesses()
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
    <Column field="command" header="Nom du processus" sortable></Column>
    <Column field="pid" header="ID du processus" sortable></Column>
    <Column field="status" header="Statut" sortable>
      <template #body="props">
        <div class="white-space-nowrap">
          <span v-if="props.data.status === 'R'">En cours d'exécution</span>
          <span v-else-if="props.data.status === 'S'">En veille</span>
        </div>
      </template>
    </Column>
    <Column field="cpu" header="Processeur(%)" sortable>
      <template #body="props">
        <span>{{ props.data.cpu / 10 }}</span>
      </template>
    </Column>
    <Column field="mem" header="Mémoire privée" sortable>
      <template #body="props">
        <span>{{ filesize((props.data.mem - props.data.mem_shared) * 1000) }}</span>
      </template>
    </Column>
    <Column field="mem_shared" header="Mémoire partagée" sortable>
      <template #body="props">
        <span>{{ filesize(props.data.mem_shared * 1000) }}</span>
      </template>
    </Column>
  </DataTable>
</template>
