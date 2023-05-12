import {defineStore} from "pinia";

export type SynoStoreState = {
  apiInfo: { [propKey: string]: ResponseApiInfo } | null
  icons: { [propKey: string]: string }
}
const synoApi = useSynoApi()

export const useSynoStore = defineStore('syno-store', {
  state: (): SynoStoreState => ({
    apiInfo: {},
    icons: {}
  }),

  actions: {
    async fetchApiInfo() {
      this.apiInfo = await synoApi.get('SYNO.API.Info', 'query')
      return this.apiInfo
    },

    async fetchFileStationSharedFolders(params?: RequestFileStationSharedFolders): Promise<ResponseFileManagerSharedFolder> {
      return synoApi.get('SYNO.FileStation.List', 'list_share', {
        additional: '["real_path","owner","time","size","perm","volume_status"]',
        ...params
      })
    },

    async fetchFileStationFiles(params?: RequestFileStationFiles): Promise<ResponseFileManagerFile> {
      return synoApi.get('SYNO.FileStation.List', 'list', {
        additional: '["real_path","owner","time","size","perm","volume_status"]',
        ...params
      })
    },

    async fetchLogs(params?: RequestLogs) {
      return synoApi.get('SYNO.Core.SyslogClient.Log', 'list', {
        ...params
      })
    },

    async fetchMonitoring(): Promise<ResponseMonitoring> {
      return synoApi.get('SYNO.Core.System.Utilization', 'get')
    },

    async fetchMonitoringProcesses(): Promise<ResponseMonitoringProcess[]> {
      const {process} = await synoApi.get('SYNO.Core.System.Process', 'list')
      return process
    },

    async fetchMonitoringServices(): Promise<ResponseMonitoringService[]> {
      const {slices} = await synoApi.get('SYNO.Core.System.ProcessGroup', 'list')
      return slices
    },

    async fetchPackages(): Promise<ResponseFetchPackages> {
      const {packages} = await synoApi.get('SYNO.Core.Package', 'list', {
        additional: '["status_sketch","dsm_apps"]'
      })
      return packages
    },

    async fetchIcons() {
      const {JSConfig} = await synoApi.get('SYNO.Core.Desktop.Initdata', 'get_ui_config', {lang: 'fre'})
      const icons: { [propKey: string]: string } = {}
      Object.values(JSConfig)
        .flatMap((it: any) => {
          return Object.keys(it).map(key => ({key: key, value: it[key]}))
        })
        .filter((it: any) => it.value.icon != null)
        .forEach((it: any) => {
          icons[it.key] = `${it.value.jsBaseURL}/${it.value.icon}`
        })

      this.icons = icons
    },

    async fetchUser(): Promise<ResponseAuthAccount> {
      return synoApi.get('SYNO.Core.NormalUser', 'get', {version: 1})
    },

    async getJavascriptUiString(): Promise<string> {
      const blob = await synoApi.get('SYNO.Core.Desktop.UIString', 'getjs', {lang: 'fre'}, {
        responseType: 'blob',
        headers: {
          'Content-Type': 'application/javascript'
        }
      })

      return blob.text()
    },

    async handleLogin(username: string, password: string): Promise<ResponseAuthLogin> {
      return synoApi.get('SYNO.API.Auth', 'login', {
        account: username,
        passwd: password,
        format: 'sid'
      })
    },

    async handleFilestationDownload(path: string): Promise<Blob> {
      return synoApi.get('SYNO.FileStation.Download', 'download', {
        path,
        mode: 'download'
      })
    }
  },

  getters: {}
})
