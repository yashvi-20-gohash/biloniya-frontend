'use client'

import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useState } from 'react'

interface CheckoutFormProps {
  amount: number
  onSuccess?: () => void
  onError?: (error: Error) => void
}

export default function CheckoutForm({
  amount,
  onSuccess,
  onError,
}: CheckoutFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Check if stripe and elements are loaded
    if (!stripe || !elements) {
      setErrorMessage('Stripe.js has not loaded yet.')
      return
    }

    const paymentElement = elements.getElement(PaymentElement)

    // Ensure the PaymentElement is rendered properly
    if (!paymentElement) {
      setErrorMessage('Payment Element has not been loaded.')
      return
    }

    setIsLoading(true)

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment-success`,
        },
      })

      if (error) {
        setErrorMessage(error.message || 'An unexpected error occurred.')
        onError?.(new Error(error.message || 'Payment failed'))
      } else {
        onSuccess?.()
      }
    } catch (e) {
      const error = e as Error
      setErrorMessage(error.message)
      onError?.(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6">
        <PaymentElement id="payment-element" />
      </div>

      {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}

      <button
        disabled={isLoading || !stripe || !elements}
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-md disabled:opacity-50"
      >
        <span>{isLoading ? 'Processing...' : `Pay $${amount.toFixed(2)}`}</span>
      </button>

      <div className="text-center text-sm text-gray-500 mt-4">
        Your payment is secured by Stripe
      </div>
    </form>
  )
}
