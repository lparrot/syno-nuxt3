import {H3Event} from "h3";

export default defineEventHandler(async (event) => {
  switch (event.node.req.method) {
    case 'GET':
      return useGetMethod(event)
    case 'PUT':
      return usePutMethod(event)
    default:
      break
  }
})

async function useGetMethod(event: H3Event) {

}

async function usePutMethod(event: H3Event) {

}
