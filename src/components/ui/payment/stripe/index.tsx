'use client'

import { loadStripe } from '@stripe/stripe-js'
import CheckoutForm from './checkout-form'
import { useState, useEffect } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import type { Appearance, StripeElementsOptions } from '@stripe/stripe-js'

interface StripePaymentsProps {
  amount: string
  onSuccess?: () => void
  onError?: (error: Error) => void
}

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ''
)

export default function StripePayments({
  amount,
  onSuccess,
  onError,
}: StripePaymentsProps) {
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/payment/stripe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: parseInt(amount),
        currency: 'usd',
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.data.clientSecret)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        onError?.(err)
        setLoading(false)
      })
  }, [amount, onError])

  const appearance: Appearance = {
    theme: 'stripe',
    variables: {
      colorPrimary: '#0570de',
    },
    rules: {
      '.Label': {
        marginTop: '6px',
        marginBottom: '6px',
      },
    },
  }

  const options: StripeElementsOptions = {
    clientSecret: clientSecret || '',
    appearance,
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="w-full mx-auto p-4">
      {clientSecret && (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm
            amount={parseInt(amount)}
            onSuccess={onSuccess}
            onError={onError}
          />
        </Elements>
      )}
    </div>
  )
}
