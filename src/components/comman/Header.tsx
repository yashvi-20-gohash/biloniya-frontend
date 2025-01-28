'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const TopHeader = () => {
  const [isMenuOpen, setMenuOpen] = useState(false)
  const [, setDropdownOpen] = useState(false)

  const menuItems = [
    { name: 'HOME', href: '/' },
    { name: 'ABOUT', href: '/about' },
    { name: 'TOURS', href: '/tours' },
    { name: 'DESTINATION', href: '/destination' },
    {
      name: 'PAGES',
      href: '#',
      dropdown: [
        { name: 'HOTEL', href: '/hotel' },
        { name: 'ACTIVITIES', href: '/activities' },
        { name: 'TRANSPORT', href: '/transport' },
        { name: 'VISA', href: '/visa' },
        { name: 'BLOG', href: '/blog' },
        { name: 'TOUR GUIDE', href: '/tour-guide' },
        { name: 'SHOP', href: '/shop' },
        { name: 'GALLERY', href: '/gallery' },
        { name: 'FAQS', href: '/faqs' },
      ],
    },
    { name: 'CONTACT', href: '/contact' },
  ]

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen)
  }

  return (
    <div>
      <div className="bg-black py-3 text-white">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex lg:justify-between md:block pt-2 md:pt-0">
            <ul className="basis-full lg:justify-between flex gap-6 lg:gap-9 items-center">
              <li>
                <div className="flex items-center gap-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="27"
                    height="27"
                    viewBox="0 0 27 27"
                  >
                    <g>
                      <path
                        d="M9.84497 19.8136V25.0313C9.84583 25.2087 9.90247 25.3812 10.0069 25.5246C10.1112 25.6679 10.2581 25.7748 10.4266 25.8301C10.5951 25.8853 10.7767 25.8861 10.9457 25.8324C11.1147 25.7787 11.2625 25.6732 11.3682 25.5308L14.4203 21.3773L9.84497 19.8136ZM26.6468 0.156459C26.5201 0.0661815 26.3708 0.0127263 26.2155 0.00200482C26.0603 -0.00871662 25.9051 0.0237135 25.7671 0.0957086L0.454599 13.3145C0.308959 13.3914 0.188959 13.5092 0.109326 13.6535C0.0296936 13.7977 -0.00610776 13.962 0.00631628 14.1262C0.0187403 14.2905 0.0788492 14.4475 0.179266 14.5781C0.279683 14.7087 0.416039 14.8071 0.571599 14.8613L7.60847 17.2666L22.5946 4.45283L10.9981 18.4242L22.7915 22.4551C22.9085 22.4944 23.0327 22.5077 23.1554 22.4939C23.2781 22.4802 23.3963 22.4399 23.5017 22.3757C23.6072 22.3115 23.6973 22.225 23.7659 22.1223C23.8344 22.0196 23.8797 21.9032 23.8985 21.7812L26.9922 0.968709C27.0151 0.81464 26.995 0.657239 26.934 0.513898C26.8731 0.370556 26.7737 0.246854 26.6468 0.156459Z"
                        fill="#63ab45"
                      ></path>
                    </g>
                  </svg>
                  <div className="flex flex-col">
                    <span className="text-xs">Email:</span>
                    <Link
                      className="text-sm font-bold text-[#b0191e]"
                      href="mailto:info@example.com"
                    >
                      info@example.com
                    </Link>
                  </div>
                </div>
              </li>
              <li>
                <div>
                  <span className="text-sm hover:text-secondary-color text-[13px] font-normal">
                    50% Off Your Next Trip. Hurry Up For your new Tour!
                    <Link
                      className="text-[#b0191e] font-medium underline"
                      href="#"
                    >
                      {' '}
                      Book Your Tour
                    </Link>
                  </span>
                </div>
              </li>
              <li>
                <div className="flex gap-4">
                  <div className="border border-white w-8 rounded-full h-8 flex justify-center items-center">
                    <Link href="#">
                      <Image
                        src="/navbar/facebook.png"
                        alt="facebook"
                        width={100}
                        height={100}
                        className="w-4"
                      />
                    </Link>
                  </div>
                  <div className="border border-white w-8 rounded-full h-8 flex justify-center items-center">
                    <Link href="#">
                      <Image
                        src="/navbar/instagram.png"
                        alt="instagram"
                        width={100}
                        height={100}
                        className="w-4"
                      />
                    </Link>
                  </div>
                  <div className="border border-white w-8 rounded-full h-8 flex justify-center items-center">
                    <Link href="#">
                      <Image
                        src="/navbar/linkedin.png"
                        alt="linkedin"
                        width={100}
                        height={100}
                        className="w-4"
                      />
                    </Link>
                  </div>
                  <div className="border border-white w-8 rounded-full h-8 flex justify-center items-center">
                    <Link href="#">
                      <Image
                        src="/navbar/twitter.png"
                        alt="twitter"
                        width={100}
                        height={100}
                        className="w-4"
                      />
                    </Link>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <nav className="bg-white border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <Link href="/" className="logo text-xl font-bold flex items-center">
              <Image src="/navbar/logo.svg" width={120} height={120} alt="logo" />
            </Link>
          </div>

          <button
            onClick={toggleMenu}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-dropdown"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>

          <div
            className={`${isMenuOpen ? 'block' : 'hidden'
              } w-full md:block md:w-auto`}
            id="navbar-dropdown"
          >
            <ul className="flex justify-end lg:items-center md:items-center items-start text-center flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
              {menuItems.map((item, index) => (
                <li key={index} className="relative group">
                  {item.dropdown ? (
                    <div
                      onMouseEnter={() => setDropdownOpen(true)}
                      onMouseLeave={() => setDropdownOpen(false)}
                      className="relative"
                    >
                      <button className="flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#b0191e] md:p-0 md:w-auto">
                        {item.name}
                        <span className="ml-2.5 text-xl font-bold">+</span>
                      </button>
                      <div className="hidden group-hover:block absolute z-10 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
                        <ul className="py-2 text-sm text-gray-700">
                          {item.dropdown.map((dropItem, dropIndex) => (
                            <li key={dropIndex}>
                              <Link
                                href={dropItem.href}
                                className="block px-4 py-2 hover:bg-gray-100"
                              >
                                {dropItem.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#b0191e] md:p-0"
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default TopHeader
