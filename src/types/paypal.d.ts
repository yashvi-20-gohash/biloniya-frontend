// paypal.d.ts
declare module '@paypal/checkout-server-sdk' {
  namespace paypal {
    namespace core {
      class PayPalHttpClient {
        constructor(environment: SandboxEnvironment | LiveEnvironment)
        execute(
          request: OrdersGetRequest | OrdersCreateRequest
        ): Promise<{ result: OrdersGetResponse | OrdersCreateResponse }> // Updated to include OrdersCreateResponse
      }

      class SandboxEnvironment {
        constructor(clientId: string, clientSecret: string)
      }

      class LiveEnvironment {
        constructor(clientId: string, clientSecret: string)
      }
    }

    namespace orders {
      class OrdersGetRequest {
        constructor(orderId: string)
      }

      class OrdersCreateRequest {
        constructor()
        requestBody(body: unknown): this
      }

      // Define the expected structure of the order response for GET requests
      interface OrdersGetResponse {
        id: string // Order ID
        status: string // Order status (e.g., "COMPLETED", "PENDING")
        purchase_units: Array<{
          amount: {
            currency_code: string // Currency code
            value: string // Total amount
          }
          custom_id?: string // Custom ID, if provided
        }>
      }

      // Define the expected structure of the order creation response
      interface OrdersCreateResponse {
        id: string // Order ID
        status: string // Order status (e.g., "CREATED", "COMPLETED")
        purchase_units: Array<{
          amount: {
            currency_code: string // Currency code
            value: string // Total amount
          }
          custom_id?: string // Custom ID, if provided
        }>
      }
    }
  }

  export = paypal
}
