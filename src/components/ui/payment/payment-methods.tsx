'use client'

import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import StatusModal from './status-modal'

interface PaymentMethodsProps {
  amount: string
  credit: number
  onSuccess?: () => void
  onError?: (error: Error) => void
}

type PaymentStatus =
  | 'CREATED'
  | 'SAVED'
  | 'APPROVED'
  | 'VOIDED'
  | 'COMPLETED'
  | 'PAYER_ACTION_REQUIRED'
  | 'PROCESSING'
  | 'FAILED'
  | 'CANCELLED'

interface CreditResponse {
  _id: string
  credit: number
  creditValue: number
  totalCredit: number
  createdAt: string
  isActive: boolean
}

// Define PayPal order details interface
interface PayPalOrderDetails {
  id: string
  status: PaymentStatus
  payer: {
    email_address?: string
    payer_id?: string
    name?: {
      given_name?: string
      surname?: string
    }
  }
  purchase_units: Array<{
    amount: {
      value: string
      currency_code: string
    }
    payee?: {
      email_address?: string
      merchant_id?: string
    }
  }>
  create_time: string
  update_time: string
}

export default function PaypalMethod({
  credit,
  amount,
  onSuccess,
  onError,
}: PaymentMethodsProps) {
  const router = useRouter()
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('CREATED')
  const [error, setError] = useState<string | null>(null)
  const [showStatusModal, setShowStatusModal] = useState(false)
  const [orderDetails, setOrderDetails] = useState<PayPalOrderDetails | null>(
    null
  )
  const [creditDetails, setCreditDetails] = useState<CreditResponse | null>(
    null
  )
  const [redirectTimer, setRedirectTimer] = useState<number | null>(null)

  useEffect(() => {
    return () => {
      if (redirectTimer) {
        clearTimeout(redirectTimer)
      }
    }
  }, [redirectTimer])

  async function handlePaymentCredit(paymentId: string) {
    try {
      const response = await fetch('/api/credit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentId,
          credit: credit,
          amount: amount,
          status: 'COMPLETED',
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error('Credit API error response:', errorData)
        throw new Error(
          errorData.message || `Server responded with status ${response.status}`
        )
      }

      const result = await response.json()

      if (result.status !== 'SUCCESS' || !result.data) {
        console.error('Unexpected API response:', result)
        throw new Error(result.message || 'Credit assignment failed')
      }

      setCreditDetails(result.data)
      return result.data
    } catch (error) {
      console.error('Credit API error:', error)
      throw error
    }
  }

  const handleCloseModal = () => {
    setShowStatusModal(false)
    if (paymentStatus === 'COMPLETED' && !error) {
      router.push('/dashboard')
    }
  }

  const handleSuccessfulPayment = () => {
    const timer = window.setTimeout(() => {
      router.push('/dashboard')
    }, 10000)
    setRedirectTimer(timer)
  }

  return (
    <div className="w-full max-w-full mt-6 mx-auto p-4 space-y-4 relative z-10">
      {amount ? (
        <PayPalScriptProvider
          options={{
            clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
            currency: 'USD',
            intent: 'capture',
          }}
        >
          <div className="relative z-0">
            <PayPalButtons
              style={{ layout: 'vertical', shape: 'rect' }}
              disabled={paymentStatus === 'PROCESSING'}
              createOrder={(data, actions) => {
                setError(null)
                return actions.order.create({
                  intent: 'CAPTURE',
                  purchase_units: [
                    { amount: { currency_code: 'USD', value: amount } },
                  ],
                })
              }}
              onApprove={async (data, actions) => {
                try {
                  const captureResult = await actions?.order?.capture()
                  setOrderDetails(captureResult as PayPalOrderDetails)
                  setPaymentStatus(captureResult?.status as PaymentStatus)

                  try {
                    await handlePaymentCredit(data.orderID)
                    onSuccess?.()
                    handleSuccessfulPayment()
                  } catch (creditError) {
                    console.error('Credit processing error:', creditError)
                    setError(
                      'Payment completed but credit processing failed. Please contact support.'
                    )
                  }

                  setShowStatusModal(true)
                } catch (paypalError) {
                  setError((paypalError as Error).message)
                  setPaymentStatus('FAILED')
                  onError?.(paypalError as Error)
                  setShowStatusModal(true)
                }
              }}
              onCancel={() => {
                setError('Payment cancelled. Please try again.')
                setPaymentStatus('CANCELLED')
                setShowStatusModal(true)
              }}
              onError={(err) => {
                setError('Payment failed. Please try again.')
                setPaymentStatus('FAILED')
                setShowStatusModal(true)
                console.error('PayPal error:', err)
              }}
            />
          </div>
        </PayPalScriptProvider>
      ) : (
        <div>Loading...</div>
      )}

      <StatusModal
        showStatusModal={showStatusModal}
        handleCloseModal={handleCloseModal}
        paymentStatus={paymentStatus}
        error={error}
        orderDetails={orderDetails}
        creditDetails={creditDetails}
      />
    </div>
  )
}
