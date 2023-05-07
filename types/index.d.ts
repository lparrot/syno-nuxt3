declare global {
  interface SynoApi {
    apiInfos: any;
    get: (api: string, method: string, params?: any, fetchOptions?: { method: "get" | "post" }) => Promise<any>;
    init: () => Promise<void>;
  }
}
