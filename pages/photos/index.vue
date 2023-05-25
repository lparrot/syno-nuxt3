<script lang="ts" setup>
import {useSynoStore} from "~/stores/syno";
import {ref} from "#imports";

interface PhotoItemWithUrl extends ResponsePhotoItem {
  url?: string
  url_xl?: string
}

const synoStore = useSynoStore()

const activeIndex = ref(0);
const showGallery = ref(false);
const responsiveOptions = ref([
  {
    breakpoint: '1500px',
    numVisible: 5
  },
  {
    breakpoint: '1024px',
    numVisible: 3
  },
  {
    breakpoint: '768px',
    numVisible: 2
  },
  {
    breakpoint: '560px',
    numVisible: 1
  }
]);

const photos = ref<PhotoItemWithUrl[]>([])

const sid = await window.app.getSettings('session.sid');

const fetchPhotos = async () => {
  photos.value = await synoStore.fetchPhotoItems()

  for await (let photo of photos.value) {
    photo.url = window.URL.createObjectURL(await synoApi.get('SYNO.FotoTeam.Thumbnail', 'get', {id: photo.id, cache_key: photo.additional?.thumbnail?.cache_key, type: 'unit', size: 'sm', version: 2, _sid: sid}))
  }
}

const synoApi = useSynoApi()

await fetchPhotos()

const updatePhotoUrl = async (index: number) => {
  if (photos.value[index].url_xl == null) {
    photos.value[index].url_xl = window.URL.createObjectURL(await synoApi.get('SYNO.FotoTeam.Thumbnail', 'get', {id: photos.value[index].id, cache_key: photos.value[index].additional?.thumbnail?.cache_key, type: 'unit', size: 'xl', version: 2, _sid: sid}))
  }

  activeIndex.value = index
  showGallery.value = true
}
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <div v-for="(photo, index) in photos" class="flex align-self-center max-w-15rem max-h-15rem text-center cursor-pointer">
      <Image :src="photo.url" alt="photo" image-class="max-w-full max-h-full border-round" @click="updatePhotoUrl(index)"/>
    </div>
  </div>

  <Galleria v-model:activeIndex="activeIndex" v-model:visible="showGallery" :circular="true" :fullScreen="true" :responsiveOptions="responsiveOptions" :showItemNavigators="true" :value="photos" container-style="max-width: 50%" @update:active-index="updatePhotoUrl">
    <template #item="props">
      <img :src="props.item.url_xl" alt="photo" style="width: 100%; display: block"/>
    </template>
    <template #thumbnail="props">
      <img :src="props.item.url" alt="photo" style="width: 100%;display: block"/>
    </template>
  </Galleria>
</template>

<style lang="scss" scoped>

</style>
