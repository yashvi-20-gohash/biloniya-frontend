'use client';

import { userTourexpErienceStore } from '@/src/store/website/tour-experience';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react';
import NoDataFound from '../../NoDataFound';
import { ServiceSkeleton } from '../../skeleton/service';


const OurServices = () => {
  const { getTourexpErienceList, tourexpErienceData, isTourexpErienceLoading } = userTourexpErienceStore()

  useEffect(() => {
    getTourexpErienceList();
  }, [])

  return (
    <section id="service" className="pt-12 pb-16 bg-gray-50">
      <div className="px-4 max-w-screen-xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-8">
          <h5 className="text-3xl font-semibold mb-3 ">
            <span className="flex items-center text-[#b0191e] justify-center font-secound text-lg gap-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="16"
                viewBox="0 0 15 16"
                fill='#b0191e'
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M1.92556 7.69046C2.35744 7.63298 2.78906 7.57563 3.21925 7.51077C4.14925 7.37065 5.08588 7.29138 6.01763 7.21249L6.01888 7.21243C6.15888 7.20055 6.29875 7.18874 6.43844 7.17668C7.50663 6.968 8.58732 6.89083 9.66644 6.94628C10.7733 7.06837 11.8592 7.41421 12.8857 7.97163L12.8857 8.23655C11.8592 8.79397 10.7733 9.13981 9.66644 9.26191C8.58732 9.31735 7.50663 9.24018 6.43844 9.03151C5.36831 8.93932 4.29813 8.82412 3.21925 8.69742C2.14031 8.57065 1.07012 8.42092 -6.78702e-07 8.23655L-7.01862e-07 7.97163C0.639938 7.86135 1.28306 7.77588 1.92556 7.69046ZM10.7633 15.8502C10.9332 15.4596 11.12 15.0855 11.3061 14.7127C11.389 14.5468 11.4717 14.3811 11.5527 14.2144C11.8159 13.6729 12.1141 13.1545 12.4299 12.6477C12.5448 12.4632 12.64 12.2604 12.7336 12.061C12.8972 11.7124 13.056 11.3741 13.3071 11.1616C13.7816 10.7768 14.3283 10.5734 14.886 10.574L15 10.7353C14.9945 11.4677 14.8235 12.1813 14.5088 12.7859C14.3311 13.1802 14.0336 13.4059 13.7358 13.6317C13.6073 13.7292 13.4787 13.8268 13.3597 13.9379C12.965 14.3066 12.5615 14.6637 12.1492 15.0093C11.7369 15.3549 11.3159 15.689 10.8685 16L10.7633 15.8502ZM11.7543 0.665536C11.4882 0.436859 11.2226 0.208798 10.9388 -1.5523e-06L10.816 0.149784C11.0528 0.725784 11.3072 1.27877 11.5703 1.82018C11.8335 2.3616 12.1142 2.89157 12.3949 3.40997C12.4795 3.56628 12.5538 3.73514 12.628 3.90394C12.8 4.29501 12.9718 4.68572 13.2721 4.91908C13.7312 5.33563 14.2754 5.56049 14.8334 5.56418L14.9562 5.4144C14.9651 4.68055 14.8095 3.95951 14.5089 3.3408C14.3471 3.01108 14.0894 2.80252 13.824 2.58763C13.6722 2.46474 13.5178 2.33975 13.3773 2.1888C12.9914 1.77409 12.6142 1.3824 12.1931 1.0368C12.0446 0.91489 11.8994 0.790152 11.7543 0.665536Z"
                ></path>
              </svg>
              Tour Experience
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="16"
                viewBox="0 0 15 16"
                fill='#b0191e'
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M13.0744 8.30954C12.6426 8.36702 12.2109 8.42437 11.7807 8.48923C10.8507 8.62935 9.91412 8.70862 8.98237 8.78751L8.98112 8.78757C8.84112 8.79945 8.70125 8.81126 8.56156 8.82332C7.49337 9.032 6.41268 9.10917 5.33356 9.05372C4.22669 8.93163 3.14081 8.58578 2.11432 8.02837V7.76345C3.14081 7.20603 4.22669 6.86018 5.33356 6.73809C6.41268 6.68265 7.49337 6.75982 8.56156 6.96849C9.63169 7.06068 10.7019 7.17588 11.7807 7.30259C12.8597 7.42935 13.9299 7.57908 15 7.76345V8.02837C14.3601 8.13865 13.7169 8.22412 13.0744 8.30954ZM4.23673 0.14976C4.06677 0.540388 3.88 0.914468 3.69388 1.28726C3.61104 1.45317 3.52831 1.61887 3.44728 1.78561C3.18413 2.32705 2.88589 2.84546 2.57011 3.35234C2.45519 3.5368 2.36002 3.73958 2.26642 3.939C2.10282 4.28757 1.94402 4.62593 1.69294 4.83843C1.21844 5.2232 0.671682 5.42665 0.114031 5.42597L0 5.26468C0.00551875 4.53235 0.176481 3.81866 0.491219 3.2141C0.6689 2.81982 0.966407 2.59414 1.26418 2.36828C1.39271 2.27078 1.52129 2.17324 1.64031 2.06209C2.03504 1.69345 2.43853 1.33633 2.8508 0.990726C3.26307 0.645126 3.68411 0.31104 4.13147 0L4.23673 0.14976ZM3.24568 15.3345C3.51184 15.5631 3.77735 15.7912 4.06123 16L4.18404 15.8502C3.9472 15.2742 3.69281 14.7212 3.42966 14.1798C3.16651 13.6384 2.88581 13.1084 2.60511 12.59C2.52048 12.4337 2.44621 12.2649 2.37198 12.0961C2.19999 11.705 2.02816 11.3143 1.72794 11.0809C1.26879 10.6644 0.7246 10.4395 0.166563 10.4358L0.0437562 10.5856C0.0348937 11.3194 0.190456 12.0405 0.491113 12.6592C0.652919 12.9889 0.910556 13.1975 1.17597 13.4124C1.32782 13.5353 1.48222 13.6602 1.62268 13.8112C2.00863 14.2259 2.38582 14.6176 2.80686 14.9632C2.95538 15.0851 3.10063 15.2098 3.24568 15.3345Z"
                ></path>
              </svg>
            </span>
          </h5>

          <h2 className="text-3xl font-medium mb-5">
            <span className="flex items-center justify-center font-bold lg:text-4xl text-2xl gap-2">
              Ultimate Travel Experience
            </span>
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:gap-6 gap-12">
          {isTourexpErienceLoading ? (
            [...Array(3)].map((_, index) => (
              <div key={index}>
                <ServiceSkeleton />
              </div>
            ))
          ) : (
            tourexpErienceData.length > 0 ? (
              tourexpErienceData?.slice(0, 3).map(tour => (
                <div key={tour._id} className="w-full group cursor-pointer ">
                  <div className="bg-white rounded-xl shadow-[0_2px_8px_0px_rgba(0,0,0,0.2)] overflow-hidden transition-all duration-300 hover:shadow-lg">
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={tour?.serviceImageUrl}
                        alt={tour?.serviceImage}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      {/* Top Tags Container */}
                      <div className="absolute top-4 left-4 flex flex-col gap-2">
                        {/* Duration Tag */}
                        <div className="bg-black text-white px-4 py-1.5 rounded text-sm font-medium uppercase tracking-wide">
                          {tour?.duration}
                        </div>

                        {/* Location Tag */}
                        <div className="bg-white/90 text-gray-800 px-3 py-1.5 rounded-lg flex items-center gap-2 text-sm font-medium">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                            className="text-[#b0191e]"
                          >
                            <path d="M8 0a6.5 6.5 0 0 0-6.5 6.5c0 4.553 6.325 9.794 6.5 9.94.175-.146 6.5-5.387 6.5-9.94A6.5 6.5 0 0 0 8 0Zm0 9.5a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                          </svg>
                          {tour?.location}
                        </div>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-5">
                      {/* Title */}
                      <h3 className="text-xl font-bold text-gray-800 mb-4 hover:text-[#b0191e] transition-colors">
                        {tour?.title}
                      </h3>

                      {/* Destinations */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {tour?.tags.map((tag, index) => (
                          <React.Fragment key={index}>
                            <a
                              href={`/#`}
                              className="text-gray-600 hover:text-[#b0191e] text-xs transition-colors"
                            >
                              {tag}
                            </a>
                            {index < tour?.tags.length - 1 && (
                              <span className="text-gray-400 text-xs">→</span>
                            )}
                          </React.Fragment>
                        ))}
                      </div>

                      {/* Price and CTA Section */}
                      <div >
                        <Link href="/travels">
                          <button className="bg-[#b0191e] text-base w-full font-medium text-white px-4 py-2 rounded flex items-center justify-center gap-2 hover:bg-[#b0191e] transition-colors">
                            Book Enquiry
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="#fff">
                              <path
                                d="M8.15624 10.2261L7.70276 12.3534L5.60722 18L6.85097 17.7928L12.6612 10.1948C13.4812 10.1662 14.2764 10.1222 14.9674 10.054C18.1643 9.73783 17.9985 8.99997 17.9985 8.99997C17.9985 8.99997 18.1643 8.26211 14.9674 7.94594C14.2764 7.87745 13.4811 7.8335 12.6611 7.80518L6.851 0.206972L5.60722 -5.41705e-07L7.70276 5.64663L8.15624 7.77386C7.0917 7.78979 6.37132 7.81403 6.37132 7.81403C6.37132 7.81403 4.90278 7.84793 2.63059 8.35988L0.778036 5.79016L0.000253424 5.79016L0.554115 8.91458C0.454429 8.94514 0.454429 9.05483 0.554115 9.08539L0.000253144 12.2098L0.778036 12.2098L2.63059 9.64035C4.90278 10.1523 6.37132 10.1857 6.37132 10.1857C6.37132 10.1857 7.0917 10.2102 8.15624 10.2261Z"
                              ></path>
                              <path
                                d="M12.0703 11.9318L12.0703 12.7706L8.97041 12.7706L8.97041 11.9318L12.0703 11.9318ZM12.0703 5.23292L12.0703 6.0714L8.97059 6.0714L8.97059 5.23292L12.0703 5.23292ZM9.97892 14.7465L9.97892 15.585L7.11389 15.585L7.11389 14.7465L9.97892 14.7465ZM9.97892 2.41846L9.97892 3.2572L7.11389 3.2572L7.11389 2.41846L9.97892 2.41846Z"
                              ></path>
                            </svg>
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex justify-center col-span-6  mt-8 ">
                <NoDataFound
                  title={`No Data Found`}
                  message={
                    <p className="mb-7 text-neutral-500">
                      {` We didn't find any Data here`}
                    </p>
                  }
                />
              </div>
            )

          )}


        </div>
      </div>
    </section>
  );
};

export default OurServices;
