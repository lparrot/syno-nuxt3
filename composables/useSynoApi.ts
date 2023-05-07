const url = 'https://admin.nas-parrot.synology.me/webapi/entry.cgi'
export let apiInfos: any = null

export class SynoError extends Error {
  code: number;

  constructor(error: any, message: string = 'Unknown error') {
    super(message);
    this.code = error?.code
  }
}

export default function useSynoApi() {
  const init = async () => {
    apiInfos = await get('SYNO.API.Info', 'query')
  }

  const get = async (api: string, method: string, params: any = {}, fetchOptions: { method: 'get' | 'post' } = {method: 'get'}): Promise<any> => {
    const info = apiInfos?.[api]
    const sid = await window.ipcRenderer.invoke('settings.get', 'session.sid')

    const version = info?.maxVersion || 1

    const formData = new FormData()
    formData.append('api', api)
    formData.append('method', method)
    formData.append('version', version)
    formData.append('_sid', sid)

    Object.keys(params).forEach(it => {
      formData.append(it, params[it])
    })

    let res = null

    switch (fetchOptions.method) {
      case 'get':
        res = await $fetch<any>(url, {
          method: 'get',
          params: {
            api: api,
            method: method,
            version: version,
            _sid: sid,
            ...params
          }
        })
        break;
      case 'post':
        const formData = new FormData()
        formData.append('api', api)
        formData.append('method', method)
        formData.append('version', version)
        formData.append('_sid', sid)
        Object.keys(params).forEach(it => {
          formData.append(it, params[it])
        })
        res = await $fetch<any>(url, {
          method: 'post',
          responseType: 'json',
          body: formData
        })
        break
      default:
        throw new Error('Opération non supportée.')
    }

    if (res instanceof Blob) {
      return res
    }

    if (res.success) {
      return res.data
    } else {
      throw new SynoError(res.error, getErrorMessage(res.error.code))
    }
  }

  return <SynoApi>{
    apiInfos,
    get,
    init,
  }
}

export const getErrorMessage = (errorCode: number) => {
  switch (errorCode) {
    case 101:
      return 'No parameter of API, method or version.'
    case 102:
      return 'The requested API does not exist.'
    case 103:
      return 'The requested method does not exist.'
    case 104:
      return 'The requested version does not support the functionality.'
    case 105:
      return 'The logged in session does not have permission.'
    case 106:
      return 'Session timeout.'
    case 107:
      return 'Session interrupted by duplicated login.'
    case 108:
      return 'Failed to upload the file.'
    case 109:
    case 110:
    case 111:
      return 'The network connection is unstable or the system is busy.'
    case 112:
    case 113:
    case 150:
      return 'Preserve for other purpose.'
    case 114:
      return 'Lost parameters for this API.'
    case 115:
      return 'Not allowed to upload a file.'
    case 116:
      return 'Not allowed to perform for a demo site.'
    case 117:
    case 118:
      return 'The network connection is unstable or the system is busy.'
    case 119:
      return 'Invalid session.'
    default:
      return 'Unknown error.'
  }
}
