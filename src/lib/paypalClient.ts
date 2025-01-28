// paypalClient.ts
import paypal from '@paypal/checkout-server-sdk'

function createPayPalClient() {
  const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID
  const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET

  // Check if the client ID and secret are provided
  if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
    throw new Error(
      'PayPal client ID and secret must be provided in the environment variables'
    )
  }

  // Using the sandbox environment for testing
  const environment = new paypal.core.SandboxEnvironment(
    PAYPAL_CLIENT_ID,
    PAYPAL_CLIENT_SECRET
  )
  return new paypal.core.PayPalHttpClient(environment)
}

const client = createPayPalClient()

export default client
