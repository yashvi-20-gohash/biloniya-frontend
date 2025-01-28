'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/src/components/ui/dialog'
import { CheckCircle2, Loader2, XCircle } from 'lucide-react'

// Types
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

// Extended PayPalOrderDetails to include the captures field
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
    payments?: {
      captures?: Array<{
        status: string
        create_time: string
      }>
    }
  }>
  create_time: string
  update_time: string
}

interface StatusModalProps {
  showStatusModal: boolean
  handleCloseModal: () => void
  paymentStatus: PaymentStatus
  error: string | null
  orderDetails: PayPalOrderDetails | null
  creditDetails: CreditResponse | null
}

export default function StatusModal({
  showStatusModal,
  handleCloseModal,
  paymentStatus,
  error,
  orderDetails,
  // creditDetails,
}: StatusModalProps) {
  const getStatusDisplay = () => {
    switch (paymentStatus) {
      case 'COMPLETED':
        return {
          title: 'Payment Completed!',
          description: error
            ? 'Payment successful but there was an issue processing credits. Our team will resolve this shortly.'
            : `Transaction completed at ${orderDetails?.create_time ? new Date(orderDetails.create_time).toLocaleString() : 'Unknown time'}`,
          icon: <CheckCircle2 className="w-12 h-12 text-green-500 mb-4" />,
        }
      case 'PROCESSING':
        return {
          title: 'Payment Processing',
          description: 'Your payment is being processed...',
          icon: (
            <Loader2 className="w-12 h-12 text-blue-500 mb-4 animate-spin" />
          ),
        }
      case 'FAILED':
        return {
          title: 'Payment Failed',
          description:
            error ||
            'There was an error processing your payment. Please try again.',
          icon: <XCircle className="w-12 h-12 text-red-500 mb-4" />,
        }
      case 'CANCELLED':
        return {
          title: 'Payment Cancelled',
          description: 'You have cancelled the payment process.',
          icon: <XCircle className="w-12 h-12 text-yellow-500 mb-4" />,
        }
      default:
        return {
          title: `Payment ${paymentStatus}`,
          description: 'Processing your payment...',
          icon: (
            <Loader2 className="w-12 h-12 text-blue-500 mb-4 animate-spin" />
          ),
        }
    }
  }

  const content = getStatusDisplay()

  return (
    <Dialog open={showStatusModal} onOpenChange={handleCloseModal}>
      <DialogContent
        className="sm:max-w-md bg-white shadow-lg rounded-lg z-50"
        style={{ zIndex: 1050 }}
      >
        <DialogHeader>
          <div className="flex flex-col items-center text-center">
            {content.icon}
            <DialogTitle className="text-xl font-semibold mb-2">
              {content.title}
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              {content.description}
            </DialogDescription>
            {paymentStatus === 'COMPLETED' && orderDetails && (
              <div className="mt-4 space-y-4 w-full">
                {/* Payment Details */}
                <div className="p-4 bg-gray-50 rounded-lg w-full">
                  <h4 className="font-medium text-sm mb-3">Payment Details:</h4>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Order ID:</span>{' '}
                      {orderDetails.id}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Amount:</span>{' '}
                      {orderDetails.purchase_units[0].amount.value}{' '}
                      {orderDetails.purchase_units[0].amount.currency_code}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Status:</span>{' '}
                      {orderDetails.purchase_units[0].payments?.captures?.[0]
                        ?.status ?? 'N/A'}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Transaction Date:</span>{' '}
                      {orderDetails.purchase_units[0].payments?.captures?.[0]
                        ?.create_time
                        ? new Date(
                            orderDetails.purchase_units[0].payments.captures[0].create_time
                          ).toLocaleString()
                        : 'N/A'}
                    </p>
                  </div>
                </div>

                {/* Credit Details */}
                {/* {creditDetails && (
                  <div className="p-4 bg-blue-50 rounded-lg w-full">
                    <h4 className="font-medium text-sm mb-3">
                      Credit Information:
                    </h4>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Credits Added:</span>{' '}
                        {creditDetails.credit}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Credit Value:</span> $
                        {creditDetails.creditValue}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Total Credits:</span>{' '}
                        {creditDetails.totalCredit}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Transaction ID:</span>{' '}
                        {creditDetails._id}
                      </p>
                    </div>
                  </div>
                )} */}
              </div>
            )}
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
