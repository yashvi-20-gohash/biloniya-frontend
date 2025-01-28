import React from 'react'

export function ForgotPasswordSkeleton() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-full mt-4 flex justify-center items-center">
        <div className="animate-pulse space-y-4 p-6 w-[60%] bg-white rounded shadow-md">
          <div className="h-6 bg-gray-200 rounded w-2/3"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>

          <div className="space-y-2">
            <div className="h-12 bg-gray-200 rounded"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
          </div>

          <div className="h-10 bg-gray-300 rounded w-full"></div>

          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
        </div>
      </div>
    </div>
  )
}

export function VerifyPasswordSkeleton() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-full mt-4 flex justify-center items-center">
        <div className="animate-pulse space-y-4 p-6 w-[60%] bg-white rounded shadow-md">
          <div className="space-y-2">
            <div className="h-12 bg-gray-200 rounded"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
          </div>

          <div className="h-10 bg-gray-300 rounded w-full"></div>

          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
        </div>
      </div>
    </div>
  )
}
