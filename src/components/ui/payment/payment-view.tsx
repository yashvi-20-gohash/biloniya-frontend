import React, { useState, useCallback, useEffect } from 'react'
import { Card, CardContent } from '@/src/components/ui/card'
import Image from 'next/image'
import PaymentSummary from './payment-summary'

const VisaIcon = () => (
  <svg
    width="46"
    height="32"
    viewBox="0 0 34 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="Payment method icon">
      <rect x="0.5" y="0.5" width="33" height="23" rx="3.5" fill="white" />
      <path
        id="visa-logo"
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M10.751 15.8579H8.69129L7.14674 9.79198C7.07343 9.51295 6.91776 9.26627 6.68879 9.15001C6.11737 8.85784 5.4877 8.62531 4.80078 8.50804V8.2745H8.11886C8.57681 8.2745 8.92026 8.62531 8.97751 9.03274L9.77891 13.4083L11.8376 8.2745H13.8401L10.751 15.8579ZM14.985 15.8579H13.0398L14.6415 8.2745H16.5868L14.985 15.8579ZM19.1035 10.3753C19.1607 9.96689 19.5042 9.73335 19.9049 9.73335C20.5346 9.67471 21.2205 9.79199 21.7929 10.0832L22.1364 8.45042C21.5639 8.21688 20.9343 8.09961 20.3628 8.09961C18.4748 8.09961 17.101 9.15002 17.101 10.6078C17.101 11.7169 18.0741 12.2992 18.761 12.65C19.5042 12.9998 19.7904 13.2334 19.7332 13.5832C19.7332 14.1079 19.1607 14.3414 18.5893 14.3414C17.9024 14.3414 17.2155 14.1665 16.5868 13.8743L16.2433 15.5081C16.9303 15.7992 17.6734 15.9165 18.3603 15.9165C20.4773 15.9741 21.7929 14.9247 21.7929 13.3496C21.7929 11.3661 19.1035 11.2498 19.1035 10.3753ZM28.6008 15.8579L27.0562 8.2745H25.3972C25.0537 8.2745 24.7103 8.50804 24.5958 8.85784L21.7356 15.8579H23.7381L24.1378 14.7498H26.5983L26.8273 15.8579H28.6008ZM25.6834 10.3167L26.2548 13.1747H24.653L25.6834 10.3167Z"
        fill="#172B85"
      />
      <rect x="0.5" y="0.5" width="33" height="23" rx="3.5" stroke="#F2F4F7" />
    </g>
  </svg>
)

const MasterCardIcon = () => (
  <svg
    width="46"
    height="32"
    viewBox="0 0 34 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="0.5" y="0.5" width="33" height="23" rx="3.5" fill="white" />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M17.179 16.8297C15.9949 17.8278 14.459 18.4303 12.7807 18.4303C9.03582 18.4303 6 15.4306 6 11.7303C6 8.02997 9.03582 5.03027 12.7807 5.03027C14.459 5.03027 15.9949 5.63277 17.179 6.63081C18.363 5.63277 19.8989 5.03027 21.5773 5.03027C25.3221 5.03027 28.358 8.02997 28.358 11.7303C28.358 15.4306 25.3221 18.4303 21.5773 18.4303C19.8989 18.4303 18.363 17.8278 17.179 16.8297Z"
      fill="#ED0006"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M17.1797 16.8297C18.6376 15.6008 19.5621 13.7722 19.5621 11.7303C19.5621 9.68832 18.6376 7.85972 17.1797 6.63081C18.3637 5.63277 19.8996 5.03027 21.578 5.03027C25.3228 5.03027 28.3587 8.02997 28.3587 11.7303C28.3587 15.4306 25.3228 18.4303 21.578 18.4303C19.8996 18.4303 18.3637 17.8278 17.1797 16.8297Z"
      fill="#F9A000"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M17.1793 16.8297C18.6372 15.6008 19.5616 13.7722 19.5616 11.7303C19.5616 9.68835 18.6372 7.85976 17.1793 6.63086C15.7213 7.85976 14.7969 9.68835 14.7969 11.7303C14.7969 13.7722 15.7213 15.6008 17.1793 16.8297Z"
      fill="#FF5E00"
    />
    <rect x="0.5" y="0.5" width="33" height="23" rx="3.5" stroke="#F2F4F7" />
  </svg>
)
const PAYMENT_OPTIONS = [
  {
    value: 'paypal',
    label: 'Pay with PayPal',
    description:
      'You will be redirected to PayPal website to complete your purchase securely.',
    icon: (
      <Image
        src="/paypal-logo.webp"
        alt="PayPal"
        width={65}
        height={24}
        className="object-contain"
      />
    ),
  },
  {
    value: 'stripe',
    label: 'Pay with Stripe',
    description: 'We support Mastercard, Visa, Discover and Stripe.',
    icon: (
      <div className="flex space-x-2">
        <VisaIcon />
        <MasterCardIcon />
        <Image
          src="/stripe-logo.webp"
          alt="Stripe"
          width={65}
          height={24}
          className="object-contain"
        />
      </div>
    ),
  },
]

export default function PaymentView() {
  const [selectedMethod, setSelectedMethod] = useState('paypal')
  const [amount, setAmount] = useState('0')
  const [, setCreditValue] = useState(0)
  const [, setCheckoutSessionUrl] = useState('')

  const calculateAmount = useCallback((credits: number) => {
    if (credits >= 1 && credits <= 100) {
      return (credits * 5).toString()
    } else if (credits >= 101 && credits <= 200) {
      return (credits * 4).toString()
    } else if (credits >= 201) {
      return (credits * 3).toString()
    }
    return '0'
  }, [])

  const queryParams = new URLSearchParams(window.location.search)

  const credit = Number(queryParams.get('credit')) || 0

  const createPayPalOrder = async () => {
    try {
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_PAYPAL_ACCESS_TOKEN}`,
        },
        body: JSON.stringify({
          amount: Number(amount),
          credit: Number(credit),
        }),
      })

      const orderData = await response.json()
      if (orderData.status === 'SUCCESS') {
        const approveLink = orderData.data.paymentId.links.find(
          (link: { rel: string }) => link.rel === 'payer-action'
        )
        if (approveLink) {
          window.location.href = approveLink.href
        }
      } else {
        console.error('Error creating PayPal order:', orderData.message)
      }
    } catch (error) {
      console.error('Error creating PayPal order:', error)
    }
  }

  const createStripeOrder = async () => {
    try {
      const response = await fetch('/api/payment/stripe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_PAYPAL_ACCESS_TOKEN}`,
        },
        body: JSON.stringify({
          amount: Number(amount),
          currency: 'USD',
        }),
      })

      const data = await response.json()
      if (data.status === 'SUCCESS') {
        setCheckoutSessionUrl(data.data.checkoutSessionUrl)
        window.location.href = data.data.checkoutSessionUrl
      } else {
        console.error('Error creating Checkout session:', data.message)
      }
    } catch (error) {
      console.error('Error creating Checkout session:', error)
    }
  }

  const handlePayment = async () => {
    if (selectedMethod === 'paypal') {
      await createPayPalOrder()
    } else if (selectedMethod === 'stripe') {
      await createStripeOrder()
    }
  }

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search)
    const creditsFromQuery = Number(queryParams.get('credit')) || 0
    setCreditValue(creditsFromQuery)
    setAmount(calculateAmount(creditsFromQuery))
  }, [calculateAmount])

  return (
    <div className="flex w-full gap-3">
      <div className="w-8/12">
        <div className="space-y-5 mt-10">
          <div className="space-y-3">
            {PAYMENT_OPTIONS.map((option) => (
              <Card
                key={option.value}
                className={`p-5 cursor-pointer transition-all hover:bg-accent ${
                  selectedMethod === option.value
                    ? 'ring-2 bg-accent ring-primary'
                    : ''
                }`}
                onClick={() => setSelectedMethod(option.value)}
              >
                <CardContent className="p-0">
                  <div className="flex items-center">
                    <div className="flex-grow flex flex-col">
                      <span>{option.label}</span>
                      <span className="text-sm text-muted-foreground">
                        {option.description}
                      </span>
                    </div>
                    <div className="flex items-center">{option.icon}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <div className="w-4/12 mt-10">
        <PaymentSummary onPurchase={handlePayment} />
      </div>
    </div>
  )
}
