<script lang="ts" setup>
import {ref} from "#imports";
import {ChartData, ChartOptions} from "chart.js";
import Chart from "primevue/chart";

const synoApi = useSynoApi()

const chart_cpu = ref<Chart>()

const chartData: ChartData = {
  labels: new Array(50).fill(''),
  datasets: [
    {
      label: 'Processeur',
      pointStyle: false,
      fill: true,
      data: new Array(50).fill(0),
      borderWidth: 1
    }
  ]
}

const chartOptions = ref<ChartOptions>({
  maintainAspectRatio: false,
  responsive: true,
  animation: {
    duration: 500,
  },
  scales: {
    y: {
      min: 0,
      max: 100,
    },
    x: {
      grid: {
        display: false,
      }
    }
  },
})

const monitor = async () => {
  const data = await synoApi.get('SYNO.Core.System.Utilization', 'get')

  chartData.labels?.shift()
  chartData.labels?.push('')
  chartData.datasets[0].data.shift()
  chartData.datasets[0].data.push(data.cpu.user_load)

  chart_cpu.value?.refresh()
}

await monitor()

const intervalMonitor = window.setInterval(async () => {
  await monitor()
}, 5000)

onUnmounted(() => {
  window.clearInterval(intervalMonitor)
})
</script>

<template>
  <div class="grid w-full">
    <div class="col-12 md:col-6 lg:col-4">
      <Chart ref="chart_cpu" :data="chartData" :options="chartOptions" height="400" type="line"/>
      <div class="flex justify-content-end">
        <span>CPU ({{ chartData.datasets[0].data[49] }}%)</span>
      </div>
    </div>
  </div>
</template>
