<script lang="ts" setup>
import {ref} from "#imports";
import {ChartOptions} from "chart.js";
import {filesize} from "filesize";

const synoApi = useSynoApi()

const data = ref({
  cpu: []
})

const chartNetworkOptions = ref<ChartOptions>({
  scales: {
    y: {
      ticks: {
        callback: (data) => {
          return <string>filesize(data)
        }
      }
    }
  }
})

const chart_cpu = ref()
const chart_memory = ref()
const chart_network = ref()

const monitor = async () => {
  const data: ResponseMonitoring = await synoApi.get('SYNO.Core.System.Utilization', 'get')
  chart_cpu.value?.updateData([data.cpu.user_load])
  chart_memory.value?.updateData([data.memory.real_usage])
  chart_network.value?.updateData([
    (data.network[0].rx === 0 ? 1 : data.network[0].rx),
    (data.network[0].tx === 0 ? 1 : data.network[0].tx)
  ])
}

let intervalMonitor: number

onMounted(async () => {
  await monitor()

  intervalMonitor = window.setInterval(async () => {
    await monitor()
  }, 5000)
})

onUnmounted(() => {
  window.clearInterval(intervalMonitor)
})
</script>

<template>
  <div class="grid w-full">
    <div class="col-12 md:col-6 xl:col-4">
      <AppMonitoringContainer ref="chart_cpu" :labels="['Processeur ({0}%)']" title="Processeur"/>
    </div>
    <div class="col-12 md:col-6 xl:col-4">
      <AppMonitoringContainer ref="chart_memory" :colors="['#f19922']" :labels="['Mémoire ({0}%)']" title="Mémoire"/>
    </div>
    <div class="col-12 md:col-6 xl:col-4">
      <AppMonitoringContainer ref="chart_network" :colors="['#0817b4', '#39ade5']" :labels="[(data) => `RX (${filesize(data)})`, (data) => `TX (${filesize(data)})`]" :options="chartNetworkOptions" :y-max="1000000" title="Réseau"/>
    </div>
  </div>
</template>
