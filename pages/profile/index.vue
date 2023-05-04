<script lang="ts" setup>
import {useToast} from "primevue/usetoast";

const {user, fetchUser} = useAuth()
const toast = useToast()
const synoApi = useSynoApi()

await fetchUser()

const formProfile = ref({
  fullname: user.value?.fullname,
  email: user.value?.email
})

const updateProfile = async () => {
  const {success} = await synoApi.get('SYNO.Core.NormalUser', 'set', {
    fullname: formProfile.value.fullname,
    email: formProfile.value.email,
  })

  if (success) {
    toast.add({severity: 'success', detail: 'Profil modifié', life: 5000})
  } else {
    toast.add({severity: 'error', detail: 'Erreur lors de la modification du profil', life: 5000})
  }
}
</script>

<template>
  <div class="grid">
    <div class="flex flex-column col-12 md:col-6">
      <label for="fullname">Nom complet:</label>
      <InputText id="fullname" v-model="formProfile.fullname"/>
    </div>
    <div class="flex flex-column col-12 md:col-6">
      <label for="email">Email:</label>
      <InputText id="email" v-model="formProfile.email"/>
    </div>

    <div class="col-12">
      <Button class="w-full" @click="updateProfile" label="Modifier les informations de profil"/>
    </div>
  </div>
</template>
