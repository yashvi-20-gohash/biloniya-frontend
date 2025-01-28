'use client'
import { Marquee } from '@devnomic/marquee'
import '@devnomic/marquee/dist/index.css'
import Image from 'next/image'
interface sponsorsProps {
  icon: string
  name: string
}

const sponsors: sponsorsProps[] = [
  {
    icon: '/patner.png',
    name: 'Acmebrand',
  },
  {
    icon: '/patner-1.png',
    name: 'Acmebrand',
  },
  {
    icon: '/patner-2.png',
    name: 'Acmebrand',
  },
  {
    icon: '/patner-3.png',
    name: 'Acmebrand',
  },

  {
    icon: '/patner-4.png',
    name: 'Acmebrand',
  },

  {
    icon: '/patner.png',
    name: 'Acmebrand',
  },
  {
    icon: '/patner-6.png',
    name: 'Acmebrand',
  },

  {
    icon: '/patner-7.png',
    name: 'Acmebrand',
  },

  {
    icon: '/patner-8.png',
    name: 'Acmebrand',
  },
  {
    icon: '/patner-9.png',
    name: 'Acmebrand',
  },
]

export const SponsorsSection = () => {
  return (
    <section id="sponsors" className="max-w-[75%] mx-auto pb-5 sm:pb-6">
      <h2 className="text-lg md:text-2xl font-bold text-center mb-6">
        Our Platinum Sponsors
      </h2>

      <div className="mx-auto">
        <Marquee
          className="gap-[3rem]"
          fade
          innerClassName="gap-[3rem]"
          pauseOnHover
        >
          {sponsors.map(({ icon, name }) => (
            <div
              key={name}
              className="flex items-center text-xl md:text-2xl font-medium "
            >
              <Image
                src={icon}
                alt="main-icon"
                width={1000}
                height={1000}
                className="w-36"
              />
              {/* {name} */}
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  )
}
