'use client'
import { useState, useEffect, useCallback } from 'react'

// ----------------------------------------------------------------------

// Countdown based on a specific date
export function useCountdownDate(date: Date) {
  const [countdown, setCountdown] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  })

  useEffect(() => {
    const setNewTime = () => {
      const startTime = date
      const endTime = new Date()
      const distanceToNow = startTime.valueOf() - endTime.valueOf()

      const getDays = Math.floor(distanceToNow / (1000 * 60 * 60 * 24))

      const getHours = `0${Math.floor(
        (distanceToNow % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      )}`.slice(-2)

      const getMinutes = `0${Math.floor(
        (distanceToNow % (1000 * 60 * 60)) / (1000 * 60)
      )}`.slice(-2)

      const getSeconds = `0${Math.floor(
        (distanceToNow % (1000 * 60)) / 1000
      )}`.slice(-2)

      setCountdown({
        days: getDays.toString().padStart(2, '0') || '00',
        hours: getHours || '00',
        minutes: getMinutes || '00',
        seconds: getSeconds || '00',
      })
    }

    const interval = setInterval(setNewTime, 1000)

    // Set initial time once immediately
    setNewTime()

    return () => clearInterval(interval)
  }, [date])

  return countdown
}

// Usage example:
// const countdown = useCountdownDate(new Date('07/07/2025 21:30'));

// ----------------------------------------------------------------------

// Countdown for seconds with an initial value
export function useCountdownSeconds(initCountdown: number) {
  const [countdown, setCountdown] = useState<number>(initCountdown)

  const startCountdown = useCallback(() => {
    let remainingSeconds = countdown

    const intervalId = setInterval(() => {
      remainingSeconds -= 1

      if (remainingSeconds === 0) {
        clearInterval(intervalId)
        setCountdown(initCountdown)
      } else {
        setCountdown(remainingSeconds)
      }
    }, 1000)
  }, [initCountdown, countdown])

  const counting = initCountdown > countdown

  return { counting, countdown, setCountdown, startCountdown }
}

// Usage example:
// const { counting, countdown, startCountdown } = useCountdownSeconds(60);

// ----------------------------------------------------------------------

// Example UI component using Shadcn components for countdown display

import { Button } from '@/src/components/ui/button'

export function CountdownDisplay() {
  const { days, hours, minutes, seconds } = useCountdownDate(
    new Date('12/31/2024 23:59')
  )

  return (
    <div className="flex flex-col items-center space-y-2">
      <h6 className="text-center">
        {days} Days {hours}:{minutes}:{seconds}
      </h6>
      <p className="text-center">{`Countdown to New Year's Eve!`}</p>
    </div>
  )
}

export function CountdownSecondsDisplay() {
  const { countdown, counting, startCountdown } = useCountdownSeconds(60)

  return (
    <div className="flex flex-col items-center space-y-2">
      <h6 className="text-center">{countdown} seconds remaining</h6>
      {!counting && (
        <Button onClick={startCountdown} size="lg">
          Start Countdown
        </Button>
      )}
    </div>
  )
}
