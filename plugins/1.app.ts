import {SynoError} from "#imports";
import {getErrorMessage} from "~/composables/useSynoApi";
import {useSynoStore} from "~/stores/syno";

export default defineNuxtPlugin(async nuxt => {
  const {$toast} = useNuxtApp()
  const {fetchApiInfo, getJavascriptUiString, fetchIcons} = useSynoStore()
  const {fetchUser} = useAuth()
  const {connect} = useSocketIo()

  await connect({port: 8000})

  socket.on('message', ({type, data}) => {
    switch (type) {
      case 'update:update-available':
        $toast.add({
          detail: 'Une mise à jour est disponible. Téléchargement en cours ...',
          severity: 'info'
        })
        break
      case 'update:update-not-available':
        $toast.add({
          detail: 'Aucune mise à jour disponible.',
          severity: 'info'
        })
        break
      default:
        break
    }
  })

  await fetchApiInfo()
  await fetchUser()

  nuxt.vueApp.config.errorHandler = (err, instance, info) => {
    if (err instanceof SynoError) {
      $toast.add({severity: 'error', detail: getErrorMessage(err.code), life: 5000})
    }
  }

  // Récupération du javascript I18n côté
  const js = await getJavascriptUiString()

  useHead({
    script: [
      {innerHTML: js}
    ]
  })

  await fetchIcons()
})
