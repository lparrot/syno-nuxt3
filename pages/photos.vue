<script lang="ts" setup>
import {ref} from "#imports";
import {MenuItem} from "primevue/menuitem";

const items = ref<MenuItem[]>([
  {label: 'Photos', icon: 'pi pi-fw pi-camera', to: '/photos'},
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

<style lang="scss" scoped>

</style>
