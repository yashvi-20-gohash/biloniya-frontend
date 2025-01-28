import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

// Hotel data structure
const hotelData = [
  {
    id: 1,
    duration: "2 Nights / 3 Days",
    location: "Jaipur",
    title: "Luxurious Stay at Jaipur Palace",
    description:
      "Experience the royal treatment at Jaipur Palace, where luxury meets heritage. Enjoy world-class amenities and a memorable stay.",
    price: 1200,
    originalPrice: 1500,
    imageUrl: "/hotels/hotel-1.jpeg",
    locationLink: "https://goo.gl/maps/xyz",
  },
  {
    id: 2,
    duration: "3 Nights / 4 Days",
    location: "Udaipur",
    title: "Lakeview Retreat at Udaipur",
    description:
      "Wake up to mesmerizing lake views at our premium Udaipur hotel. Indulge in comfort and serenity.",
    price: 1800,
    originalPrice: 2200,
    imageUrl: "/hotels/hotel-2.jpg",
    locationLink: "https://goo.gl/maps/abc",
  },
  {
    id: 3,
    duration: "1 Night / 2 Days",
    location: "Jodhpur",
    title: "Heritage Stay at Jodhpur Haveli",
    description:
      "Step into a heritage haveli for a royal experience in the heart of Jodhpur. Perfect for history lovers.",
    price: 800,
    originalPrice: 1000,
    imageUrl: "/hotels/hotel-3.jpg",
    locationLink: "https://goo.gl/maps/def",
  },
  {
    id: 4,
    duration: "2 Nights / 3 Days",
    location: "Pushkar",
    title: "Scenic Views at Pushkar Resort",
    description:
      "Relax amidst nature at our Pushkar resort, offering breathtaking views and unmatched hospitality.",
    price: 1000,
    originalPrice: 1300,
    imageUrl: "/hotels/hotel-4.webp",
    locationLink: "https://goo.gl/maps/ghi",
  },
];

const OurServices = () => {
  return (
    <section id="hotels" className="lg:pt-16 lg:pb-20 pt-12 pb-16 bg-gray-100">
      <div className="px-4 max-w-screen-xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-8">
          <h5 className="text-3xl font-semibold mb-3">
            <span className="flex items-center text-[#b0191e] justify-center font-secound text-lg gap-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="16"
                viewBox="0 0 15 16"
                fill="#b0191e"
              >
                <path d="M1.92556 7.69046C2.35744 7.63298..." />
              </svg>
              Exceptional Hotel Stays
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="16"
                viewBox="0 0 15 16"
                fill="#b0191e"
              >
                <path d="M13.0744 8.30954C12.6426 8.36702..." />
              </svg>
            </span>
          </h5>

          <h2 className="text-3xl font-medium mb-5">
            <span className="flex items-center justify-center font-bold lg:text-4xl text-2xl gap-2">
              Explore Our Luxury Hotels
            </span>
          </h2>
        </div>

        {/* Hotels Grid */}
        <div className="grid xl:grid-cols-4 lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:gap-6 gap-12">
          {hotelData.map((hotel) => (
            <div key={hotel.id} className="w-full group cursor-pointer">
              <div className="bg-white lg:min-h-[388px] rounded-xl shadow-[0_2px_8px_0px_rgba(0,0,0,0.2)] overflow-hidden transition-all duration-300 hover:shadow-lg">
                {/* Image Section */}
                <div className="relative aspect-[4/3]">
                  <Image
                    src={hotel.imageUrl}
                    alt={hotel.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <div className="bg-white/90 text-gray-800 px-3 py-1.5 rounded-lg flex items-center gap-2 text-sm font-medium">

                      {hotel.location}
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2 line-clamp-1">{hotel.title}</h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{hotel.description}</p>

                  <div className='w-full'>
                    <Link href="/travels">
                      <button className="bg-[#b0191e] text-base w-full font-medium text-white px-4 py-2 rounded flex items-center justify-center gap-2 hover:bg-[#b0191e] transition-colors">
                        Book Enquiry

                      </button>
                    </Link>
                  </div>

                </div>


              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurServices;
