<script lang="ts" setup>
import {useSynoStore} from "~/stores/syno";
import {TreeNode} from "primevue/tree";
import {ref} from "#imports";
import {isNotBlank} from "~/utils/string";
import {filesize} from "filesize";
import {padStart} from 'lodash'

const {getI18n} = useSynoApi()
const {fetchMonitoringServices} = useSynoStore()

const services = await fetchMonitoringServices()

const convertCpuTime = (cpu_time: number | string) => {
  if (typeof cpu_time === 'string') {
    return cpu_time
  }

  cpu_time = cpu_time / 60

  const hours = Math.floor(cpu_time / 60);
  const minutes = Math.floor((cpu_time - ((hours * 3600)) / 60));
  const seconds = Math.floor((cpu_time * 60) - (hours * 3600) - (minutes * 60));
  return `${padStart(hours.toString(), 2, '0')}:${padStart(minutes.toString(), 2, '0')}:${padStart(seconds.toString(), 2, '0')}`
}

const convertCpuUtilization = (cpu_utilisation: number | string) => {
  if (typeof cpu_utilisation === 'string') {
    return cpu_utilisation
  }

  return Math.round(cpu_utilisation * 1000) / 10
}

const nodes = ref<TreeNode[]>(services.map(service => ({
  key: service.unit_name,
  data: service,
  children: <TreeNode[]>service.process.map(process => ({
    key: process.pid.toString(),
    data: process
  }))
})))
</script>

<template>
  <TreeTable :value="nodes" auto-layout class="p-treetable-sm">
    <Column :sortable="true" body-class="white-space-nowrap" expander field="name" header="Nom de service">
      <template #body="props">
        <span>{{ isNotBlank(props.node.data.name) ? props.node.data.name : getI18n(props.node.data.name_i18n) }}</span>
      </template>
    </Column>
    <Column :sortable="true" field="cpu_utilization" header="Processeur(%)">
      <template #body="props">
        <span>{{ convertCpuUtilization(props.node.data.cpu_utilization) }}</span>
      </template>
    </Column>
    <Column :sortable="true" field="cpu_time" header="Processeur Time">
      <template #body="props">
        {{ convertCpuTime(props.node.data.cpu_time) }}
      </template>
    </Column>
    <Column :sortable="true" field="memory" header="Mémoire">
      <template #body="props">
        {{ filesize(props.node.data.memory) }}
      </template>
    </Column>
    <Column :sortable="true" field="byte_read_per_sec" header="Lecture (s)">
      <template #body="props">
        {{ filesize(props.node.data.byte_read_per_sec) }}
      </template>
    </Column>
    <Column :sortable="true" field="byte_write_per_sec" header="Ecriture (s)">
      <template #body="props">
        {{ filesize(props.node.data.byte_write_per_sec) }}
      </template>
    </Column>
  </TreeTable>
</template>

<style lang="scss" scoped>

</style>
