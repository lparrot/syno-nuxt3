<script lang="ts" setup>
import {MenuItem} from "primevue/menuitem";
import {ref} from "#imports";

const items = ref<MenuItem[]>([
  {
    label: 'Profil',
    icon: 'pi pi-fw pi pi-user',
    to: '/profile'
  },
  {
    label: 'Apparence',
    icon: 'pi pi-fw pi-palette',
    to: '/profile/appareance'
  },
  {
    label: 'Notifications',
    icon: 'pi pi-fw pi-bell',
    to: '/profile/notifications'
  },
]);

</script>

<template>
  <TabMenu :model="items"/>
  <nuxt-page/>
</template>
