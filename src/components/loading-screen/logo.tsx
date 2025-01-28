'use client'

import { cn } from '@/src/lib/utils'
import Link from 'next/link'
import React, { forwardRef } from 'react'
import Image from 'next/image' // Import the Image component from Next.js

interface LogoProps extends React.ComponentPropsWithoutRef<'div'> {
  width?: number
  height?: number
  disableLink?: boolean
  href?: string
}

export const Logo = forwardRef<HTMLDivElement, LogoProps>(
  (
    {
      width = 40,
      height = 40,
      disableLink = false,
      className,
      href = '#',
      ...other
    },
    ref
  ) => {
    // Replace SVG with Image
    return (
      <div
        ref={ref}
        className={cn('flex items-center justify-center', className)} // Bounce effect on the container
        style={{ width, height }}
        {...other}
      >
        <Link
          href={href}
          className={`flex items-center ${disableLink ? 'pointer-events-none' : ''}`}
          aria-label="logo"
        >
          <Image
            src="/logo.png"
            alt="Logo"
            width={width}
            height={height}
            className="object-contain"
          />
        </Link>
      </div>
    )
  }
)

Logo.displayName = 'Logo'
