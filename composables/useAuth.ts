import {createEventHook} from "@vueuse/core";
import {SynoError} from "~/composables/useSynoApi";
import {Ref} from "vue";
import {useSynoStore} from "~/stores/syno";

const user: Ref<ResponseAuthAccount | null> = ref<ResponseAuthAccount | null>(null)

export default function () {
  const {fetchUser: fetchUserInStore, handleLogin} = useSynoStore()
  const io = useSocketIo()
  const loginSuccess = createEventHook<{ user: Ref<ResponseAuthAccount | null>, result: any }>()
  const loginError = createEventHook<SynoError>()

  const fetchUser = async () => {
    try {

      user.value = await fetchUserInStore()
      await io.connect()

      io.on('window:resized', win => {
        console.log(win)
      })
    } catch (error) {
      user.value = null
    }
  }

  const logout = async () => {
    await window.syno.setSettings('session.sid', null)
    await io.disconnect()
    user.value = null
  }

  const login = async (username: string, password: string, persistCredentials = false) => {
    try {
      const data = await handleLogin(username, password)

      await window.syno.setSettings('session.sid', data.sid)
      if (persistCredentials) {
        await window.syno.setSettings('session.username', username)
        await window.syno.setSettings('session.password', password)
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
