'use client'
import Image from 'next/image'

export const ReadArticle = () => {
  const services = [
    {
      imgSrc: '/home/artical-1.png',
      title: 'CORONAVIRUS',
      heding: '12 coronavirus myth and facts that you should aware of.',
      heddetails: 'Dr Daino Borgia',
    },
    {
      imgSrc: '/home/artical-2.png',
      title: 'CORONAVIRUS',
      heding: '12 coronavirus myth and facts that you should aware of.',
      heddetails: 'Dr Daino Borgia',
    },
  ]

  return (
    <div className="bg-[#1B2D34]">
      <section id="sponsors" className="max-w-[85%]  mx-auto py-5 sm:py-11">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 items-center">
          <div>
            <h5 className="text-2xl text-white lg:w-56 text-center">
              Read the article from us
            </h5>
          </div>

          {services.map((service, index) => (
            <div key={index} className="text-center">
              <Image
                src={service.imgSrc}
                alt={service.title}
                className="lg:w-[511px] lg:h-[282px] object-cover rounded-xl mb-4 border"
                width={511}
                height={282}
              />
              <h6 className="text-sm text-[#FFF04B] uppercase mb-1 font-normal text-left">
                {service.title}
              </h6>
              <h6 className="text-lg mb-2 font-semibold text-left text-white">
                {service.heding}
              </h6>
              <p className="text-sm font-normal text-gray-200 text-left">
                {service.heddetails}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
