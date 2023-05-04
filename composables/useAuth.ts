import {createEventHook} from "@vueuse/core";
import {SynoError} from "~/composables/useSynoApi";
import {Ref} from "vue";

const user: Ref<ResponseAccount | null> = ref<ResponseAccount | null>(null)

export default function () {
  const synoApi = useSynoApi()
  const loginSuccess = createEventHook<{ user: Ref<ResponseAccount | null>, result: any }>()
  const loginError = createEventHook<SynoError>()

  const fetchUser = async () => {
    try {
      user.value = await synoApi.get('SYNO.Core.NormalUser', 'get', {version: 1})
    } catch (error) {
      user.value = null
    }
  }

  const logout = async () => {
    await window.ipcRenderer.invoke('settings.set', 'session.sid', null)
    user.value = null
  }

  const login = async (username: string, password: string, persistCredentials = false) => {
    try {
      const data = await synoApi.get('SYNO.API.Auth', 'login', {
        account: username,
        passwd: password,
        format: 'sid'
      })

      await window.ipcRenderer.invoke('settings.set', 'session.sid', data.sid)
      if (persistCredentials) {
        await window.ipcRenderer.invoke('settings.set', 'session.username', username)
        await window.ipcRenderer.invoke('settings.set', 'session.password', password)
      }

      await fetchUser()

      await loginSuccess.trigger({result: data, user});
    } catch (error: unknown) {
      await loginError.trigger(error as SynoError);
    }
  }

  return {
    fetchUser,
    login,
    onLoginSuccess: loginSuccess.on,
    onLoginError: loginError.on,
    logout,
    user,
  }
}
