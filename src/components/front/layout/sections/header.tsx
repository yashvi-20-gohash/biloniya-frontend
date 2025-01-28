'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone } from 'lucide-react';

const HeaderSection = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const menuItems = [
    { name: 'HOME', href: '/' },
    { name: 'ABOUT US', href: '/about-us' },
    { name: 'SECURITY', href: '/security' },
    { name: 'TRAVELS', href: '/travels' },
    { name: 'HOTELS', href: '/hotels' },
    { name: 'GALLERY', href: '/gallery' },
    { name: 'CONTACT US', href: '/contact-us' },
  ];

  // Close the menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const drawer = document.querySelector('.mobile-menu');
      if (drawer && !drawer.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <div className="w-full">
      {/* Top Header Section */}
      <div className="bg-black py-3 text-white px-5 md:px-6 lg:px-0">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex lg:justify-between md:block pt-2 md:pt-0">
            <ul className="basis-full lg:justify-between lg:flex gap-6 lg:gap-9 items-center">
              {/* Email Section */}
              <li className="lg:block hidden">
                <div className="flex items-center gap-4">
                  {/* Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="27"
                    height="27"
                    viewBox="0 0 27 27"
                  >
                    <g>
                      <path
                        d="M9.84497 19.8136V25.0313C9.84583 25.2087 9.90247 25.3812 10.0069 25.5246C10.1112 25.6679 10.2581 25.7748 10.4266 25.8301C10.5951 25.8853 10.7767 25.8861 10.9457 25.8324C11.1147 25.7787 11.2625 25.6732 11.3682 25.5308L14.4203 21.3773L9.84497 19.8136ZM26.6468 0.156459C26.5201 0.0661815 26.3708 0.0127263 26.2155 0.00200482C26.0603 -0.00871662 25.9051 0.0237135 25.7671 0.0957086L0.454599 13.3145C0.308959 13.3914 0.188959 13.5092 0.109326 13.6535C0.0296936 13.7977 -0.00610776 13.962 0.00631628 14.1262C0.0187403 14.2905 0.0788492 14.4475 0.179266 14.5781C0.279683 14.7087 0.416039 14.8071 0.571599 14.8613L7.60847 17.2666L22.5946 4.45283L10.9981 18.4242L22.7915 22.4551C22.9085 22.4944 23.0327 22.5077 23.1554 22.4939C23.2781 22.4802 23.3963 22.4399 23.5017 22.3757C23.6072 22.3115 23.6973 22.225 23.7659 22.1223C23.8344 22.0196 23.8797 21.9032 23.8985 21.7812L26.9922 0.968709C27.0151 0.81464 26.995 0.657239 26.934 0.513898C26.8731 0.370556 26.7737 0.246854 26.6468 0.156459Z"
                        fill="#b0191e"
                      ></path>
                    </g>
                  </svg>
                  {/* Email Info */}
                  <div className="flex flex-col">
                    <span className="text-xs">Email:</span>
                    <Link
                      className="text-sm font-bold text-[#b0191e]"
                      href="mailto:info@example.com"
                    >
                      info@biloniyagroup.com
                    </Link>
                  </div>
                </div>
              </li>

              {/* Promo Section */}
              <li>
                <div>
                  <span className="hover:text-secondary-color lg:text-[13px] flex justify-center text-[10px] font-normal">
                    50% Off Your Next Trip. Hurry Up For your new Tour!
                    <Link
                      className="text-[#b0191e] font-medium underline"
                      href="/"
                    >
                      {' '}
                      Book Your Tour
                    </Link>
                  </span>
                </div>
              </li>
              <li className='lg:block hidden'>
                <div className="flex gap-4">
                  <div className="border border-white w-8 rounded-full h-8 flex justify-center items-center">
                    <Link href="/">
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
                    <Link href="https://www.instagram.com/biloniya.group/" target='blank'>
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
                    <Link href="/">
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
                    <Link href="/">
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

      {/* Navigation */}
      <nav className="bg-white border-gray-200">
        <div className="max-w-screen-xl mx-auto lg:px-0 px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center">
                <Image
                  src="/logo.png"
                  width={150}
                  height={40}
                  alt="TripRex"
                  className="w-[75px]"
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center lg:space-x-8 md:space-x-5">
              {menuItems.map((item, index) => (
                <div key={index}>
                  <Link
                    href={item.href}
                    className="text-gray-700 hover:text-[#b0191e] font-bold lg:text-sm md:font-bold lg:font-medium md:text-[10px]"
                  >
                    {item.name}
                  </Link>
                </div>
              ))}
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <div className="flex items-center space-x-4">


                <div className="flex items-center space-x-2 text-[#b0191e]">
                  <Phone className="w-6 h-6" />
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500">To More Inquiry</span>
                    <span className="text-sm font-bold text-[#b0191e]">+91-9636922144</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-[#b0191e] hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className={`${isMenuOpen ? 'block' : 'hidden'
              } mobile-menu md:hidden`}
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#b0191e] hover:bg-gray-100"
                  onClick={() => setMenuOpen(false)} // Close menu on link click
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default HeaderSection;
