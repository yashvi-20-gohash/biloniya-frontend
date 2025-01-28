import React from 'react'

export function AddTransactionSkeleton() {
  return (
    <div className="w-6/12">
      {/* Skeleton for Autocomplete */}
      <div className="animate-pulse">
        <div className="h-11 bg-gray-300 rounded-md mb"></div>
      </div>
    </div>
  )
}
export function AddResendSkeleton() {
  return (
    <div className="w-full">
      {/* Skeleton for Autocomplete */}
      <div className="animate-pulse">
        <div className="h-11 bg-gray-300 rounded-md mb"></div>
      </div>
    </div>
  )
}
export function GeneralSettingSkeleton() {
  return (
    <div className="w-full">
      {/* Skeleton for Autocomplete */}
      <div className="animate-pulse">
        <div className="h-11 bg-gray-300 rounded-md mb"></div>
      </div>
    </div>
  )
}
