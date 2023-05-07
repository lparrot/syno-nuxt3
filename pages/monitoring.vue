<script lang="ts" setup>
import {ref} from "#imports";
import {MenuItem} from "primevue/menuitem";

const items = ref<MenuItem[]>([
  {label: 'Performances', icon: 'pi pi-fw pi-server', to: '/monitoring'},
  {label: 'Processus', icon: 'pi pi-fw pi-sitemap', to: '/monitoring/processes'}
]);
</script>

<template>
  <div class="flex h-full">
    <div class="flex h-full overflow-auto">
      <Menu :model="items" exact/>
    </div>

    <div class="flex-1 h-full overflow-auto px-4">
      <nuxt-page/>
    </div>
  </div>
</template>
