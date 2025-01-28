import React from 'react'
import { Check } from 'lucide-react'
import { Heading2 } from '../heading'

interface CheckoutStepsProps {
  activeStep?: number
  className?: string
}

const steps = ['Credits', 'Payment']

export default function CheckoutSteps({
  activeStep = 0,
  className = 'w-8/12',
}: CheckoutStepsProps) {
  return (
    <div className={`mb-8 ${className}`}>
      <Heading2 title="Checkout" description="" className="mt-10 mb-6" />
      <ol className="flex items-center w-full">
        {steps.map((step, index) => (
          <li
            key={step}
            className={`flex items-center ${
              index < steps.length - 1 ? 'w-full' : 'w-fit'
            }`}
          >
            <div className="flex items-center">
              <div
                className={`
                flex items-center justify-center w-8 h-8 rounded-full 
                ${
                  index <= (activeStep ?? 0)
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-gray-200 text-gray-600'
                }
              `}
              >
                {index < (activeStep ?? 0) ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              <span
                className={`ml-2 text-sm font-medium ${
                  index <= (activeStep ?? 0) ? 'text-primary' : 'text-gray-500'
                }`}
              >
                {step}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`w-full h-0.5 mx-2 ${
                  index < (activeStep ?? 0) ? 'bg-primary' : 'bg-gray-200'
                }`}
              ></div>
            )}
          </li>
        ))}
      </ol>
    </div>
  )
}
