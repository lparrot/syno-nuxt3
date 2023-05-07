export default function () {
  const synoApi = useSynoApi()

  return {
    fetchMonitoring: async () => {
      return synoApi.get('SYNO.Core.System.Utilization', 'get')
    },

    fetchProcesses: async () => {
      const {process} = await synoApi.get('SYNO.Core.System.Process', 'list')
      return process
    },
  }
}
