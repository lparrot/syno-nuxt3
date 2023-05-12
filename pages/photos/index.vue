<script lang="ts" setup>
import {useSynoStore} from "~/stores/syno";

const {fetchPhotoItems} = useSynoStore()

const photos = ref<ResponsePhotoItem[]>([])

const sid = await window.syno.getSettings('session.sid');

photos.value = await fetchPhotoItems()

const urls = computed(() => {
  return photos.value.map(photo => `https://admin.nas-parrot.synology.me/webapi/entry.cgi?id=${photo.id}&cache_key=${photo.additional?.thumbnail?.cache_key}&type=unit&size=sm&api=SYNO.FotoTeam.Thumbnail&method=get&version=2&_sid=${sid}`)
})
</script>

<template>
  <div class="grid">
    <img v-for="url in urls" :src="url" alt="photo" class="col-12 md:col-6 lg:col-4 xl:col-2">
  </div>
</template>

<style lang="scss" scoped>

</style>
