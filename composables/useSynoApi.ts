import {useSynoStore} from "~/stores/syno";
import {NitroFetchOptions} from "nitropack";
import {get as lodashGet} from 'lodash'

export const synoUrl = 'https://admin.nas-parrot.synology.me/webapi/entry.cgi'

export class SynoError extends Error {
  code: number;

  constructor(error: any, message: string = 'Unknown error') {
    super(message);
    this.code = error?.code
  }
}

export default function useSynoApi() {
  const getI18n = (key: string) => {
    key = key.replaceAll(':', '.')
    return lodashGet(window.SYNO_WebManager_Strings, key)
  }

  const get = async (api: string, method: string, params?: any, fetchOptions?: NitroFetchOptions<any>): Promise<any> => {
    const {apiInfo} = useSynoStore()

    const info: ResponseApiInfo = apiInfo!![api]

    const sid = await window.syno.getSettings('session.sid')

    const version = info?.maxVersion || 1

    const formData = new FormData()
    formData.append('api', api)
    formData.append('method', method)
    formData.append('version', String(version))
    formData.append('_sid', sid)

    if (params == null) {
      params = {}
    }

    Object.keys(params).forEach(it => {
      formData.append(it, params[it])
    })

    let res = null

    if (fetchOptions == null || fetchOptions.method == null) {
      fetchOptions = Object.assign({}, fetchOptions, {method: 'get'})
    }

    switch (fetchOptions.method) {
      case 'get':
        res = await $fetch<any>(synoUrl, {
          ...fetchOptions,
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
        formData.append('version', String(version))
        formData.append('_sid', sid)
        Object.keys(params).forEach(it => {
          formData.append(it, params[it])
        })
        res = await $fetch<any>(synoUrl, {
          ...fetchOptions,
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

  return {
    get,
    getI18n
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
