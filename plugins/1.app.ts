import {SynoError} from "#imports";
import {useToast} from "primevue/usetoast";
import {getErrorMessage} from "~/composables/useSynoApi";

export default defineNuxtPlugin(async nuxt => {
  const {$toast} = useNuxtApp()
  const {init} = useSynoApi()
  const {fetchUser} = useAuth()

  await init()
  await fetchUser()

  nuxt.vueApp.config.errorHandler = (err, instance, info) => {
    if (err instanceof SynoError) {
      $toast.add({severity: 'error', detail: getErrorMessage(err.code), life: 5000})
    }
  }
})
