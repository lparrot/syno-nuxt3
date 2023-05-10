import {defineStore} from "pinia";

export type SynoStoreState = {
  apiInfo: { [propKey: string]: ResponseApiInfo } | null
}
const synoApi = useSynoApi()

export const useSynoStore = defineStore('syno-store', {
  state: (): SynoStoreState => ({
    apiInfo: {}
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

    async fetchProcesses(): Promise<ResponseMonitoringProcess> {
      const {process} = await synoApi.get('SYNO.Core.System.Process', 'list')
      return process
    },

    async fetchUser(): Promise<ResponseAuthAccount> {
      return synoApi.get('SYNO.Core.NormalUser', 'get', {version: 1})
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
