"use client"

import LoadingButton from "@/src/components/ui/loading-button";
import { NewsLetterListStore } from "@/src/store/news-letter-list";
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

const FooterSection = () => {
  const { isNewsLoading, addNews, } = NewsLetterListStore()

  const [news, setNews] = useState<string | null>(null);

  const handleSubmit = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!news || !emailRegex.test(news)) {
      toast.error('Enter your valid email address');
      return;
    }
    const data = {
      email: news
    }

    const res = await addNews(data);
    if (res?.status === 'SUCCESS') {
      setNews(null)
    }
  };

  // Data for quick links
  const servicesLinks = [
    { name: "Security Services", href: "/security" },
    { name: " Travels Services", href: "/travels" },
    { name: "Hotels Services", href: "/hotels" },
    { name: "Rooms Services", href: "/hotels" },
    { name: " Venues Services", href: "/hotels" },

  ];

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about-us" },
    // { name: "Blog", href: "/" },
    { name: "Contact Us", href: "contact-us" },
    { name: "Gallery", href: "gallery" },
  ];



  // Data for social media links
  const socialMediaLinks = [
    { icon: <Facebook className="w-5 h-5" />, href: "/" },
    { icon: <Twitter className="w-5 h-5" />, href: "/" },
    { icon: <Linkedin className="w-5 h-5" />, href: "/" },
    { icon: <Instagram className="w-5 h-5" />, href: "https://www.instagram.com/biloniya.group/" },
  ];

  return (
    <div className="w-full">
      <footer className="bg-gray-900 text-white pb-6  px-4 relative mt-44 pt-52">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <div className="mb-6">
                <Link href="/">
                  <Image src="/footer-logo.png" alt=" main footer logo " width={1000} height={600} className=" w-24 mb-5" />
                </Link>
                <h4 className="text-2xl font-bold mb-5 leading-10">Want to Take Tour Packages?</h4>
                <Link href="/travels">
                  <button className="bg-[#b0191e] text-white px-6 py-2.5 font-bold rounded">Book A Tour</button>
                </Link>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h5 className="text-lg font-semibold mb-4"> Services </h5>
              <ul className="space-y-3">
                {servicesLinks.map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className="hover:text-[#b0191e]">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-4">Quick Links</h5>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className="hover:text-[#b0191e]">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>


            {/* Contact Info */}
            <div>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Phone className="w-5 h-5" />
                    <h5 className="font-semibold">More Inquiry</h5>
                  </div>
                  <a href="tel:+91-9636922144" className="hover:text-[#b0191e]">
                    +91-9636922144
                  </a>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Mail className="w-5 h-5" />
                    <h5 className="font-semibold">Send Mail</h5>
                  </div>
                  <a href="mailto:info@biloniya.com" className="hover:text-[#b0191e]">
                    info@biloniyagroup.com
                  </a>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-5 h-5" />
                    <h5 className="font-semibold">Address</h5>
                  </div>
                  <address className="not-italic"> Vivek Vihar Metro Station, Jaipur, Rajasthan 302019 </address>
                </div>
              </div>
            </div>

            {/* Payment Partners */}

          </div>

          {/* Footer Bottom */}
          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex gap-4">
                {socialMediaLinks.map((link, index) => (
                  <a key={index} href={link.href} target="blank" className="hover:text-[#b0191e]">
                    {link.icon}
                  </a>
                ))}
              </div>

              <p className="text-center">
                ©Copyright 2024 TripRex | Design By{" "}
                <a href="/" className="text-[#b0191e] font-bold">
                  Biloniya Group
                </a>
              </p>

              <div className="flex gap-4">
                <Link href="/privacy-policy" className="hover:text-[#b0191e]">
                  Privacy Policy
                </Link>
                <Link href="/terms-condition" className="hover:text-[#b0191e]">
                  Terms & Condition
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="absolute -top-32 left-[4%] w-11/12 px-4">
          <div className="bg-gradient-to-b from-[#f9f4f0] to-[#f9f4f0] px-5 py-16 text-center rounded-3xl relative z-[1]">
            <h2 className="lg:text-3xl text-xl font-bold mb-2 text-[#b0191e]">Join The Newsletter</h2>
            <p className="text-gray-600 mb-6">To receive our best monthly deals</p>

            <div className="relative max-w-lg mx-auto">
              <input
                type="email"
                value={news ?? ''}
                placeholder="Enter your email address..."
                className="w-full px-4 py-3 text-black bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#b0191e]"
                onChange={(e) => setNews(e.target?.value)}
              />
              <LoadingButton
                type="submit"
                isLoading={isNewsLoading}
                form="blog-form"
                onClick={handleSubmit}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-[#b0191e] rounded-lg hover:bg-[#b0191e]"
              >
                <svg className="w-5 h-5 text-white" viewBox="0 0 18 17">
                  <path d="M7 1L16 8.5M16 8.5L7 16M16 8.5H0.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
                </svg>
              </LoadingButton>
            </div>

            <div className="absolute top-0 left-0">
              <Image src="/home/banner3-vector1.png" alt="Newsletter Vector 1" width={1000} height={600} className="mx-auto w-28 lg:w-72 rounded-l-3xl" />
            </div>
            <div className="absolute top-0 right-0">
              <Image src="/home/banner3-vector2.png" alt="Newsletter Vector 2" width={1000} height={600} className="w-32 lg:w-[23rem] rounded-r-3xl" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FooterSection;
