import React from 'react'
import * as ProgressPrimitive from '@radix-ui/react-progress'
import { cn } from '@/src/lib/utils'

export const CircleProgress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Progress>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Progress>
>(({ className, value = 0, ...props }, ref) => {
  const percentage = Math.round(value ?? 0)

  return (
    <ProgressPrimitive.Progress
      ref={ref}
      className={cn(
        `relative h-10 w-10 overflow-hidden rounded-full flex justify-center items-center`,
        className
      )}
      {...props}
    >
      <div
        className="absolute inset-0"
        style={{
          background: `conic-gradient(hsl(var(--primary)) ${percentage}%, hsl(var(--muted)) 0)`,
        }}
      />
      <div className="absolute inset-0.5 bg-background rounded-full" />
      <div className="absolute text-[12px] text-center font-bold text-primary">{`${percentage}%`}</div>
    </ProgressPrimitive.Progress>
  )
})

CircleProgress.displayName = 'CircleProgress'
