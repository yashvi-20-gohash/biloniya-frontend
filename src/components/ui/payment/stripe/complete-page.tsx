// PaymentCompletionPage.tsx
'use client'

import React from 'react'
import { useStripe } from '@stripe/react-stripe-js'
import { useSearchParams } from 'next/navigation'

const SuccessIcon = () => (
  <svg
    width="16"
    height="14"
    viewBox="0 0 16 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-white"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15.4695 0.232963C15.8241 0.561287 15.8454 1.1149 15.5171 1.46949L6.14206 11.5945C5.97228 11.7778 5.73221 11.8799 5.48237 11.8748C5.23253 11.8698 4.99677 11.7582 4.83452 11.5681L0.459523 6.44311C0.145767 6.07557 0.18937 5.52327 0.556912 5.20951C0.924454 4.89575 1.47676 4.93936 1.79051 5.3069L5.52658 9.68343L14.233 0.280522C14.5613 -0.0740672 15.1149 -0.0953599 15.4695 0.232963Z"
      fill="currentColor"
    />
  </svg>
)

const ErrorIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-white"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.25628 1.25628C1.59799 0.914573 2.15201 0.914573 2.49372 1.25628L8 6.76256L13.5063 1.25628C13.848 0.914573 14.402 0.914573 14.7437 1.25628C15.0854 1.59799 15.0854 2.15201 14.7437 2.49372L9.23744 8L14.7437 13.5063C15.0854 13.848 15.0854 14.402 14.7437 14.7437C14.402 15.0854 13.848 15.0854 13.5063 14.7437L8 9.23744L2.49372 14.7437C2.15201 15.0854 1.59799 15.0854 1.25628 14.7437C0.914573 14.402 0.914573 13.848 1.25628 13.5063L6.76256 8L1.25628 2.49372C0.914573 2.15201 0.914573 1.59799 1.25628 1.25628Z"
      fill="currentColor"
    />
  </svg>
)

const InfoIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-white"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10 1.5H4C2.61929 1.5 1.5 2.61929 1.5 4V10C1.5 11.3807 2.61929 12.5 4 12.5H10C11.3807 12.5 12.5 11.3807 12.5 10V4C12.5 2.61929 11.3807 1.5 10 1.5ZM4 0C1.79086 0 0 1.79086 0 4V10C0 12.2091 1.79086 14 4 14H10C12.2091 14 14 12.2091 14 10V4C14 1.79086 12.2091 0 10 0H4Z"
      fill="currentColor"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.25 7C5.25 6.58579 5.58579 6.25 6 6.25H7.25C7.66421 6.25 8 6.58579 8 7V10.5C8 10.9142 7.66421 11.25 7.25 11.25C6.83579 11.25 6.5 10.9142 6.5 10.5V7.75H6C5.58579 7.75 5.25 7.41421 5.25 7Z"
      fill="currentColor"
    />
    <path
      d="M5.75 4C5.75 3.31075 6.31075 2.75 7 2.75C7.68925 2.75 8.25 3.31075 8.25 4C8.25 4.68925 7.68925 5.25 7 5.25C6.31075 5.25 5.75 4.68925 5.75 4Z"
      fill="currentColor"
    />
  </svg>
)

const STATUS_CONTENT_MAP = {
  succeeded: {
    text: 'Payment succeeded',
    iconColor: '#30B130',
    icon: <SuccessIcon />,
  },
  processing: {
    text: 'Your payment is processing.',
    iconColor: '#6D6E78',
    icon: <InfoIcon />,
  },
  requires_payment_method: {
    text: 'Your payment was not successful, please try again.',
    iconColor: '#DF1B41',
    icon: <ErrorIcon />,
  },
  default: {
    text: 'Something went wrong, please try again.',
    iconColor: '#DF1B41',
    icon: <ErrorIcon />,
  },
} as const

const PaymentDetailsTable = ({
  intentId,
  status,
}: {
  intentId: string
  status: string
}) => (
  <div className="mt-4 border rounded-lg overflow-hidden">
    <table className="w-full">
      <tbody>
        <tr className="border-b">
          <td className="px-4 py-2 text-gray-600">ID</td>
          <td className="px-4 py-2 font-mono">{intentId}</td>
        </tr>
        <tr>
          <td className="px-4 py-2 text-gray-600">Status</td>
          <td className="px-4 py-2">{status}</td>
        </tr>
      </tbody>
    </table>
  </div>
)

export default function PaymentCompletionPage() {
  const stripe = useStripe()
  const searchParams = useSearchParams()
  const [status, setStatus] =
    React.useState<keyof typeof STATUS_CONTENT_MAP>('default')
  const [intentId, setIntentId] = React.useState<string | null>(null)
  const amount = searchParams.get('amount')

  React.useEffect(() => {
    if (!stripe) return

    const clientSecret = searchParams.get('payment_intent_client_secret')
    if (!clientSecret) return

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      if (paymentIntent) {
        setStatus(paymentIntent.status as keyof typeof STATUS_CONTENT_MAP)
        setIntentId(paymentIntent.id)
      }
    })
  }, [stripe, searchParams])

  const { text, icon, iconColor } = STATUS_CONTENT_MAP[status]

  return (
    <div className="max-w-2xl mx-auto p-8">
      <div className="flex flex-col items-center space-y-4">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center"
          style={{ backgroundColor: iconColor }}
        >
          {icon}
        </div>
        <h2 className="text-xl font-semibold">{text}</h2>
        {amount && (
          <p className="text-gray-600">
            Amount paid: ${parseFloat(amount).toFixed(2)}
          </p>
        )}
        {intentId && (
          <PaymentDetailsTable intentId={intentId} status={status} />
        )}
        {intentId && (
          <a
            href={`https://dashboard.stripe.com/payments/${intentId}`}
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
            target="_blank"
            rel="noopener noreferrer"
          >
            View details in Stripe Dashboard
            <svg
              className="ml-1 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        )}
      </div>
    </div>
  )
}
