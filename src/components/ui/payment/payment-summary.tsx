import { useEffect, useState } from 'react'
import { Card } from '@/src/components/ui/card'
import { Separator } from '@/src/components/ui/separator'
import { ShieldCheck } from 'lucide-react'
import LoadingButton from '../loading-button'

interface PaymentSummaryProps {
  className?: string
  onPurchase?: () => void
  isLoading?: boolean
}

function PaymentSummary({
  className,
  onPurchase,
  isLoading,
}: PaymentSummaryProps) {
  const [credits, setCredits] = useState<string | null>(null)

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search)
    const creditParam = urlSearchParams.get('credit')
    setCredits(creditParam)
  }, [])

  const calculateCreditValue = (credits: number) => {
    if (credits >= 1 && credits <= 100) {
      return credits * 5
    } else if (credits >= 101 && credits <= 200) {
      return credits * 4
    } else if (credits >= 201) {
      return credits * 3
    }
    return 0
  }

  // Convert credits to number, handling potential null value
  const numCredits = Number(credits) || 0
  const totalAmount = calculateCreditValue(numCredits)

  return (
    <Card className={className}>
      <div className="p-6 space-y-4">
        <h2 className="text-xl font-semibold">Summary</h2>
        <Separator />
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Total Credits</span>
            <span>{credits}</span>
          </div>
          <div className="flex justify-between">
            <span>Total Amount</span>
            <span>${totalAmount}</span>
          </div>
          <div className="text-sm text-gray-500">* Plus applicable taxes</div>
        </div>
        <LoadingButton
          isLoading={isLoading ?? false}
          onClick={onPurchase}
          className="w-full"
        >
          {isLoading ? 'Processing...' : 'Purchase Credits'}
        </LoadingButton>
        <div className="flex items-center space-x-2 text-sm text-green-500 justify-center">
          <ShieldCheck className="h-4 w-4" />
          <span>Secure payment</span>
        </div>
        <div className="text-xs text-gray-500 text-center">
          This is a secure 128-bit SSL encrypted payment
        </div>
      </div>
    </Card>
  )
}

export default PaymentSummary
