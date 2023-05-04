import {SynoError} from "~/composables/useSynoApi";

export function catchSynoError(error: unknown): SynoError | null {
  if (error instanceof SynoError) {
    return error
  }
  return null
}
