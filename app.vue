<script lang="ts" setup>
import {MenuItem} from 'primevue/menuitem'
import {ref} from "#imports";
import OverlayPanel from "primevue/overlaypanel";
import {Ref} from "vue";
import {useToast} from "primevue/usetoast";

const toast = useToast()
const router = useRouter()
const {settings} = await useElectronConfig()
const {user, onLoginSuccess, onLoginError, logout, login} = useAuth()
const overlay_profile: Ref<OverlayPanel> = ref<any>()

onLoginSuccess(async ({user}) => {
  await overlay_profile.value.hide()
  toast.add({severity: 'success', detail: `Connecté sous ${user.value?.username}`, life: 5000})
  await router.push('/')
})

onLoginError(error => {
  if (error?.code === 400) {
    toast.add({detail: 'Mauvais login ou mot de passe', severity: 'error', life: 5000})
  }
})

const formLogin = ref({
  username: settings?.session?.username, password: settings?.session?.password
})

const menu_profile = computed(() => {
  return <MenuItem[]>[
    {
      label: 'Profil utilisateur', icon: 'pi pi-user', to: '/profile', command: async () => {
        await overlay_profile.value.hide()
      }
    },
    {
      label: 'Deconnexion', icon: 'pi pi-power-off', command: async () => {

        await logout()
        toast.add({detail: 'Vous êtes maintenant déconnecté', severity: 'success', life: 5000})
        await router.push('/')
      }
    },
  ]
})

const app_menubar_items = ref<MenuItem[]>([
  {label: 'Accueil', icon: 'pi pi-home', to: '/'},
  {label: 'FileStation', icon: 'pi pi-file', to: '/filestation', visible: () => user.value != null},
  {label: 'Logs', icon: 'pi pi-list', to: '/logs', visible: () => user.value != null},
  {label: 'Monitoring', icon: 'pi pi-desktop', to: '/monitoring', visible: () => user.value != null},
])

const handleLogin = async () => {
  await login(formLogin.value.username, formLogin.value.password, true)
}
</script>

<template>
  <div class="flex flex-column gap-2 h-full">
    <Menubar :model="app_menubar_items">
      <template #end>
        <div class="flex align-items-center gap-2">
          <div v-if="user != null">{{ user.username }}</div>
          <div v-else>Se connecter</div>

          <Avatar class="cursor-pointer hover:bg-primary-500 hover:text-white" shape="circle" @click="overlay_profile?.show">
            <i v-if="user != null" class="pi pi-user"></i>
            <i v-else class="pi pi-lock-open"></i>
          </Avatar>

          <OverlayPanel ref="overlay_profile" append-to="body" :pt="{content: {class: 'm-0 p-0'}}">
            <Menu v-if="user != null" :model="menu_profile" :pt="{root: {class:'border-none'}}"></Menu>
            <form class="p-2" v-else @submit.prevent="handleLogin">
              <div class="flex flex-column gap-2">
                <div class="flex flex-1 flex-column gap-2">
                  <label for="username">Login:</label>
                  <InputText id="username" v-model="formLogin.username"/>
                </div>
                <div class="flex flex-1 flex-column gap-2">
                  <label for="password">Password:</label>
                  <Password input-id="password" v-model="formLogin.password" :feedback="false" input-class="w-full"/>
                </div>
                <div class="flex flex-1 flex-column gap-2">
                  <Button label="Se connecter" icon="pi pi-check" type="submit"/>
                </div>
              </div>
            </form>
          </OverlayPanel>
        </div>
      </template>
    </Menubar>
    <div class="overflow-auto h-full">
      <nuxt-page></nuxt-page>
    </div>
  </div>
  <Toast position="bottom-right"/>
</template>

