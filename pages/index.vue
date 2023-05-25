<script lang="ts" setup>
import {useSynoStore} from "~/stores/syno";
import {ComputedRef} from "vue";

const synoStore = useSynoStore()

const systemInfo = await synoStore.fetchSystemInfo()
const quickConnectData = await synoStore.fetchQuickConnectInfo()
const fanSpeedData = await synoStore.fetchFanSpeedInfo()

const generalItems: ComputedRef<IAppAccordionInfoItem[]> = computed<IAppAccordionInfoItem[]>(() => {
  return [
    {
      label: 'Informations de base', children: [
        {label: 'Nom du serveur', slot: 'server_name'},
        {label: 'Version du DSM', value: systemInfo.firmware_ver}
      ]
    },
    {label: 'Matériel', children: []},
    {label: 'Temps', children: []},
  ]
})

console.log(systemInfo)
console.log(quickConnectData)
console.log(fanSpeedData)
</script>

<template>
  <TabView class="tabview_info">
    <TabPanel header="Général">
      <AppAccordionInfo :items="generalItems">
        <template #server_name>
          NAS_PARROT
        </template>
      </AppAccordionInfo>
    </TabPanel>
    <TabPanel header="Réseau">

    </TabPanel>
    <TabPanel header="Stockage">

    </TabPanel>
    <TabPanel header="Service">

    </TabPanel>
  </TabView>
</template>
