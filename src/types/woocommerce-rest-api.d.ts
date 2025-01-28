// src/types/woocommerce-rest-api.d.ts

declare module '@woocommerce/woocommerce-rest-api' {
  interface WooCommerceRestApiConfig {
    url: string
    consumerKey: string
    consumerSecret: string
    version: string
    wpAPIPrefix: string
  }

  interface WooCommerceResponse<T> {
    data: T
    headers: Record<string, string>
    status: number
  }

  interface WooCommerceError {
    message: string
    status: number
  }

  class WooCommerceRestApi {
    constructor(config: WooCommerceRestApiConfig)

    get<T = unknown>(
      endpoint: string,
      params?: Record<string, unknown>
    ): Promise<WooCommerceResponse<T>>
    post<T = unknown>(
      endpoint: string,
      data: Record<string, unknown>
    ): Promise<WooCommerceResponse<T>>
    put<T = unknown>(
      endpoint: string,
      data: Record<string, unknown>
    ): Promise<WooCommerceResponse<T>>
    delete<T = unknown>(endpoint: string): Promise<WooCommerceResponse<T>>
    options<T = unknown>(endpoint: string): Promise<WooCommerceResponse<T>>
  }

  export default WooCommerceRestApi
}
