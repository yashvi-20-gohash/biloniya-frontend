'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image' // for optimized image loading

const ComingSoon = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    // Set the target date (Feb 1, 2025)
    const targetDate = new Date('2025-02-01T00:00:00').getTime()

    // Update the countdown every second
    const interval = setInterval(() => {
      const now = new Date().getTime()
      const distance = targetDate - now

      // Calculate time remaining
      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      )
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
      })

      // If the countdown finishes, clear the interval
      if (distance < 0) {
        clearInterval(interval)
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        })
      }
    }, 1000)

    // Cleanup the interval on component unmount
    return () => clearInterval(interval)
  }, [])

  return (
    <section
      id="home"
      className="h-full md:h-screen flex items-center justify-center relative coming-bg"
    >
      <div className="container">
        <div className="flex items-center justify-center relative text-center py-12 pt-6 px-12 h-full w-full">
          <div>
            <a
              href="index.html"
              className="flex items-center justify-center mb-10"
            >
              <Image
                src="/logo.png"
                alt="Logo"
                width={1004}
                height={64}
                className="w-36"
              />
            </a>
            <h1 className="lg:text-6xl text-4xl font-extrabold text-white capitalize my-8">
              coming soon
            </h1>
            <div className="flex justify-center">
              <div className="max-w-xl text-center">
                <p className="font-semibold text-white text-xl">
                  Welcome Biloniya Group of Companies
                </p>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="relative mt-14">
                <div>
                  <div className="flex flex-wrap items-center justify-center gap-y-4 gap-x-4 sm:gap-x-0">
                    <div className="inline-flex flex-col items-center justify-center rounded-lg border-2 border-dashed font-bold text-white h-24 w-24 px-3 py-2">
                      <span className="text-3xl">{timeLeft.days}</span>
                      <span className="text-base">Days</span>
                    </div>
                    <div className="text-2xl font-bold mx-4 text-white hidden sm:block">
                      :
                    </div>
                    <div className="inline-flex flex-col items-center justify-center rounded-lg border-2 border-dashed font-bold text-white h-24 w-24 px-3 py-2">
                      <span className="text-3xl">{timeLeft.hours}</span>
                      <span className="text-base">Hours</span>
                    </div>
                    <div className="text-2xl font-bold mx-4 text-white hidden sm:block">
                      :
                    </div>
                    <div className="inline-flex flex-col items-center justify-center rounded-lg border-2 border-dashed font-bold text-white h-24 w-24 px-3 py-2">
                      <span className="text-3xl">{timeLeft.minutes}</span>
                      <span className="text-base">Minutes</span>
                    </div>
                    <div className="text-2xl font-bold mx-4 text-white hidden sm:block">
                      :
                    </div>
                    <div className="inline-flex flex-col items-center justify-center rounded-lg border-2 border-dashed font-bold text-white h-24 w-24 px-3 py-2">
                      <span className="text-3xl">{timeLeft.seconds}</span>
                      <span className="text-base">Seconds</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ComingSoon
