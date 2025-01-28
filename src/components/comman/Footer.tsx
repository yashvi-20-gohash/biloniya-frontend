'use client'
import { NextPage } from 'next'
import Link from 'next/link'

const Footer: NextPage = function () {
  const companyLinks = [
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog' },
    { name: 'About us', href: '/about-us' },
    { name: 'Contact us', href: '/contact-us' },
  ]

  const featuresLinks = [
    { name: 'info@innovestech.com' },
    { name: '+91-9205563360' },
    { name: 'New Delhi, India' },
    { name: 'Mon-Sun 9 am - 7 pm' },
  ]

  // const legalLinks = [
  //   { name: 'Terms Conditions', href: '#' },
  //   { name: 'Privacy Policy', href: '#' },
  // ];

  return (
    <footer className="bg-center bg-no-repeat bg-black">
      <div className="container lg:px-20">
        <div className="flex flex-col lg:flex-row justify-between items-baseline gap-14 lg:py-10 py-6 px-4 md:px-8">
          <div className="lg:w-3/12">
            <Link
              href="#"
              className="flex items-center text-white text-2xl font-bold uppercase"
            >
              InnovesTech Ventures
            </Link>

            {/* <p className="text-gray-400 text-base font-medium max-w-xs mt-4">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p> */}
          </div>

          <div className="lg:w-8/12">
            <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6 items-baseline">
              <div>
                <ul className="flex flex-col gap-3">
                  <h5 className="xl:text-xl lg:text-lg font-semibold text-gray-200 mb-2">
                    Link
                  </h5>
                  {companyLinks.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-base font-semibold text-gray-400 hover:text-white transition-all"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <ul className="flex flex-col gap-3">
                  <h5 className="xl:text-xl lg:text-lg font-semibold text-gray-200 mb-2">
                    Contact Us
                  </h5>
                  {featuresLinks.map((link) => (
                    <li key={link.name}>
                      <h5 className="text-base font-semibold text-gray-400 hover:text-white transition-all">
                        {link.name}
                      </h5>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h5 className="text-slate-300 2xl:text-lg text-base mb-4 mt-6">
                  Follow Us :
                </h5>
                <ul className="flex flex-wrap items-center gap-2">
                  <li>
                    <Link
                      href="https://www.facebook.com/"
                      className={`h-10 w-10 bg-white p-2 inline-flex items-center justify-center rounded-lg transition-all duration-500 group`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="100"
                        viewBox="0 0 50 50"
                      >
                        <path d="M25,3C12.85,3,3,12.85,3,25c0,11.03,8.125,20.137,18.712,21.728V30.831h-5.443v-5.783h5.443v-3.848 c0-6.371,3.104-9.168,8.399-9.168c2.536,0,3.877,0.188,4.512,0.274v5.048h-3.612c-2.248,0-3.033,2.131-3.033,4.533v3.161h6.588 l-0.894,5.783h-5.694v15.944C38.716,45.318,47,36.137,47,25C47,12.85,37.15,3,25,3z"></path>
                      </svg>
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="https://x.com/"
                      className={`h-10 w-10 bg-white p-2 inline-flex items-center justify-center rounded-lg transition-all duration-500 group`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="100"
                        viewBox="0 0 50 50"
                      >
                        <path d="M 5.9199219 6 L 20.582031 27.375 L 6.2304688 44 L 9.4101562 44 L 21.986328 29.421875 L 31.986328 44 L 44 44 L 28.681641 21.669922 L 42.199219 6 L 39.029297 6 L 27.275391 19.617188 L 17.933594 6 L 5.9199219 6 z M 9.7167969 8 L 16.880859 8 L 40.203125 42 L 33.039062 42 L 9.7167969 8 z"></path>
                      </svg>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://www.instagram.com/innovestech.ventures/"
                      className={`h-10 w-10 bg-white p-2 inline-flex items-center justify-center rounded-lg transition-all duration-500 group`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="100"
                        viewBox="0 0 50 50"
                      >
                        <path d="M 16 3 C 8.8324839 3 3 8.8324839 3 16 L 3 34 C 3 41.167516 8.8324839 47 16 47 L 34 47 C 41.167516 47 47 41.167516 47 34 L 47 16 C 47 8.8324839 41.167516 3 34 3 L 16 3 z M 16 5 L 34 5 C 40.086484 5 45 9.9135161 45 16 L 45 34 C 45 40.086484 40.086484 45 34 45 L 16 45 C 9.9135161 45 5 40.086484 5 34 L 5 16 C 5 9.9135161 9.9135161 5 16 5 z M 37 11 A 2 2 0 0 0 35 13 A 2 2 0 0 0 37 15 A 2 2 0 0 0 39 13 A 2 2 0 0 0 37 11 z M 25 14 C 18.936712 14 14 18.936712 14 25 C 14 31.063288 18.936712 36 25 36 C 31.063288 36 36 31.063288 36 25 C 36 18.936712 31.063288 14 25 14 z M 25 16 C 29.982407 16 34 20.017593 34 25 C 34 29.982407 29.982407 34 25 34 C 20.017593 34 16 29.982407 16 25 C 16 20.017593 20.017593 16 25 16 z"></path>
                      </svg>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" border-gray-400 border-slate-700/20  border-t">
        <div className=" text-center py-4">
          <p className="text-sm font-medium text-gray-400 ">
            © Copyright 2024
            <Link href="#" className="px-2 text-white">
              InnovesTech Ventures.
            </Link>
            All rights reserved. All registered trademarks herein are the
            property of their respective owners.
          </p>
        </div>
      </div>
    </footer>
  )
}
export default Footer
