<script lang="ts" setup>
import {ChartData, ChartOptions} from "chart.js";
import Chart from "primevue/chart";
import {ref} from "#imports";
import {interpolate} from "~/utils/string";

interface Props {
  title: string
  labels: string[]
  options?: Partial<ChartOptions>
  segmentCount?: number,
  colors?: string[]
  yMin?: number
  yMax?: number
}

const props = withDefaults(defineProps<Props>(), {
  options: () => ({}),
  segmentCount: 50,
  colors: () => ['#2953dc'],
  yMin: 0,
  yMax: 100
})

const chart = ref<Chart>()
const last_data = ref(new Array(props.labels.length).fill('0'))

const d_chartOptions = computed<ChartOptions>(() => {
  return deepMerge(<ChartOptions>{
    plugins: {
      legend: {
        position: "bottom",
      },
    },
    scales: {
      y: {
        min: props.yMin,
        max: props.yMax,
      },
    }
  }, props.options)
})

const chart_data: ChartData = {
  labels: new Array(props.segmentCount).fill(''),
  datasets: []
}

for (let i = 0; i < props.labels.length; i++) {
  chart_data.datasets.push({
    label: interpolate(props.labels[i], last_data.value[i]),
    pointStyle: false,
    fill: true,
    data: new Array(props.segmentCount).fill(0),
    borderWidth: 1,
    borderColor: props.colors[i],
    backgroundColor: `${props.colors[i]}75`
  })
}

const updateData = (data: any) => {
  for (let i = 0; i < data.length; i++) {
    chart_data.datasets[i].label = interpolate(props.labels[i], data[i])
    chart_data.datasets[i].data.shift()
    chart_data.datasets[i].data.push(data[i])
  }
  chart.value?.getChart().update('active')
}

defineExpose({
  updateData
})
</script>

<template>
  <div class="font-bold ml-6 mb-2">{{ title }}</div>
  <Chart ref="chart" :data="chart_data" :options="d_chartOptions" :height="400" type="line"/>
</template>
