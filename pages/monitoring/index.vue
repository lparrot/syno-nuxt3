<script lang="ts" setup>
import {filesize} from "filesize";
import {ref} from "#imports";
import {ChartOptions} from "chart.js";
import {Pausable, useIntervalFn} from "@vueuse/core";

const {fetchMonitoring} = useSynoHelpers()

const data = ref({
  cpu: []
})

const chartFilesizeOptions = ref<ChartOptions>({
  scales: {
    y: {
      ticks: {
        callback: (data) => {
          return `${<string>filesize(data)}/s`
        }
      }
    }
  }
})

const chart_cpu = ref()
const chart_memory = ref()
const chart_network = ref()
const chart_volume = ref()

const monitor = async () => {
  const data: ResponseMonitoring = await fetchMonitoring()
  chart_cpu.value?.updateData([data.cpu.user_load])
  chart_memory.value?.updateData([data.memory.real_usage])
  chart_network.value?.updateData([
    data.network[0].rx,
    data.network[0].tx
  ])
  chart_volume.value?.updateData([
    data.space.volume[0].read_byte,
    data.space.volume[0].write_byte
  ])
}

let intervalMonitor: Pausable

onMounted(async () => {
  await monitor()

  intervalMonitor = useIntervalFn(async () => {
    await monitor()
  }, 5000)
})

onBeforeRouteLeave(() => {
  intervalMonitor.pause()
})
</script>

<template>
  <div class="grid w-full">
    <div class="col-12 md:col-6 xl:col-4">
      <AppMonitoringContainer ref="chart_cpu" :labels="['Processeur ({0}%)']" :y-max="100" title="Processeur"/>
    </div>
    <div class="col-12 md:col-6 xl:col-4">
      <AppMonitoringContainer ref="chart_memory" :colors="['#f19922']" :labels="['Mémoire ({0}%)']" :y-max="100" title="Mémoire"/>
    </div>
    <div class="col-12 md:col-6 xl:col-4">
      <AppMonitoringContainer ref="chart_network" :colors="['#0817b4', '#39ade5']" :labels="[(data) => `RX (${filesize(data)}/s)`, (data) => `TX (${filesize(data)}/s)`]" :options="chartFilesizeOptions" title="Réseau"/>
    </div>
    <div class="col-12 md:col-6 xl:col-4">
      <AppMonitoringContainer ref="chart_volume" :colors="['#d97490', '#e4a040']" :labels="[(data) => `R: (${filesize(data)}/s)`, (data) => `W: (${filesize(data)}/s)`]" :options="chartFilesizeOptions" title="Volume"/>
    </div>
  </div>
</template>
