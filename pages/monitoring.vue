<script lang="ts" setup>
import {ref} from "#imports";
import {ChartOptions} from "chart.js";

const synoApi = useSynoApi()

const data = ref({
  cpu: []
})

const chart_cpu = ref()
const chart_memory = ref()
const chart_network = ref()

const chartOptions = ref<ChartOptions>({
  maintainAspectRatio: false,
  responsive: true,
  animation: {
    duration: 500,
  },
  scales: {
    x: {
      grid: {
        display: false,
      }
    }
  },
})

const monitor = async () => {
  const data: ResponseMonitoring = await synoApi.get('SYNO.Core.System.Utilization', 'get')
  chart_cpu.value?.updateData([data.cpu.user_load])
  chart_memory.value?.updateData([data.memory.real_usage])
  chart_network.value?.updateData([data.network[0].rx, data.network[0].tx])
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
      <AppMonitoringContainer ref="chart_cpu" title="Processeur" :labels="['Processeur ({0}%)']" :options="chartOptions"/>
    </div>
    <div class="col-12 md:col-6 xl:col-4">
      <AppMonitoringContainer ref="chart_memory" title="Mémoire" :labels="['Mémoire ({0}%)']" :options="chartOptions" :colors="['#f19922']"/>
    </div>
    <div class="col-12 md:col-6 xl:col-4">
      <AppMonitoringContainer ref="chart_network" title="Réseau" :labels="['Réception ({0} octets)', 'Transmission ({0} octets)']" :options="chartOptions" :y-max="100000" :colors="['#0817b4', '#39ade5']"/>
    </div>
  </div>
</template>
