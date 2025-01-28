'use client'
import { useEffect, useState } from 'react'

interface CreditResponse {
  _id: string
  credit: number
  creditValue: number
  totalCredit: number
  createdAt: string
  isActive: boolean
}

const PaymentFailedSection: React.FC<{ accessToken: string | null }> = ({
  accessToken,
}) => {
  const [creditDetails] = useState<CreditResponse | null>(null)

  console.log(creditDetails)

  async function handlePaymentCredit(paymentId: string) {
    // ...
    console.log(paymentId)
  }

  useEffect(() => {
    if (accessToken) {
      handlePaymentCredit(accessToken)
    }
  }, [accessToken])

  return (
    <>
      <h1>Payment Failed</h1>
    </>
  )
}

export default PaymentFailedSection
