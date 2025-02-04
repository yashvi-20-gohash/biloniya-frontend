'use client';
import { userGalleryListStore } from '@/src/store/website/gallery';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Skeleton } from '../../ui/skeleton';

const HomeHero = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { getGalleryList, galleryData, isGalleryLoading } = userGalleryListStore();

  useEffect(() => {
    getGalleryList();
  }, [])

  const slides = [
    {
      image: '/home/hore-slider-1.webp',
      title: 'Biloniya Group Of Company',
      description:
        ' Life is unpredictable, and we understand that plans might change. Enjoy flexible booking options, so you can reschedule or modify your trip with ease. ',
    },
    {
      image: '/home/hore-slider-2.webp',
      title: 'Biloniya Group Of Company',
      description:
        ' Life is unpredictable, and we understand that plans might change. Enjoy flexible booking options, so you can reschedule or modify your trip with ease. ',
    },
    {
      image: '/home/hore-slider-3.webp',
      title: 'Biloniya Group Of Company',
      description:
        ' Life is unpredictable, and we understand that plans might change. Enjoy flexible booking options, so you can reschedule or modify your trip with ease. ',
    },
  ];

  const handlePrev = () => {
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + slides.length) % slides.length
    );
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  return (
    <div className="lg:mx-8 mx-3 relative">
      <div
        id="default-carousel"
        className="relative w-full"
        data-carousel="slide"
      >
        {/* Carousel wrapper */}
        <div className="relative h-96 overflow-hidden rounded-lg md:h-[78vh]">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 duration-700 ease-in-out ${activeIndex === index ? 'block' : 'hidden'
                }`}
              data-carousel-item
            >
              <Image
                src={slide.image}
                className="absolute block w-full -translate-x-1/2 lg:h-auto h-full object-cover -translate-y-1/2 top-1/2 left-1/2"
                alt={`Slide ${index + 1}`}
                width={1000}
                height={1000}
              />
              {/* Content for each slide */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 p-5 text-white">
                <div className="text-center">
                  <div className="hero-small flex justify-center items-center mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="size-4"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                      />
                    </svg>
                    France
                  </div>

                  <h2 className="lg:text-6xl font-extrabold mb-4 w-[700px]">
                    {slide.title}
                  </h2>
                  <p className="mt-2 mb-7 lg:w-[700px] w-[300px] mx-auto leading-7 lg:text-base text-sm">
                    {slide.description}
                  </p>

                  <div className="flex lg:gap-10 gap-2 justify-center">
                    <button className="bg-[#b0191e] px-6 py-2 rounded font-bold">
                      Book Now
                    </button>

                    <div className=" flex gap-4">
                      <div className="icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="46"
                          height="45"
                          viewBox="0 0 46 45"
                          fill="none"
                        >
                          <path
                            d="M22.7613 45C35.3321 45 45.5227 34.9264 45.5227 22.5C45.5227 10.0736 35.3321 0 22.7613 0C10.1906 0 0 10.0736 0 22.5C0 34.9264 10.1906 45 22.7613 45Z"
                            fill="#34E0A1"
                          ></path>
                          <path
                            d="M36.8197 18.1105L39.5664 15.1566H33.4755C30.4262 13.0976 26.7437 11.8984 22.7611 11.8984C18.7835 11.8984 15.1113 13.1002 12.0671 15.1566H5.96094L8.70756 18.1105C7.02401 19.6289 5.96859 21.8161 5.96859 24.2446C5.96859 28.8276 9.72744 32.5432 14.3636 32.5432C16.566 32.5432 18.5725 31.7035 20.0705 30.3309L22.7612 33.227L25.4518 30.3334C26.9498 31.7061 28.9538 32.5432 31.1561 32.5432C35.7923 32.5432 39.5562 28.8276 39.5562 24.2446C39.5587 21.8136 38.5034 19.6264 36.8197 18.1105ZM14.3661 29.8608C11.2278 29.8608 8.68472 27.3469 8.68472 24.2446C8.68472 21.1423 11.2279 18.6284 14.3661 18.6284C17.5044 18.6284 20.0475 21.1423 20.0475 24.2446C20.0475 27.3469 17.5044 29.8608 14.3661 29.8608ZM22.7637 24.0812C22.7637 20.3856 20.045 17.213 16.4566 15.858C18.397 15.056 20.5257 14.611 22.7611 14.611C24.9965 14.611 27.1277 15.056 29.0682 15.858C25.4823 17.2155 22.7637 20.3857 22.7637 24.0812ZM31.1587 29.8608C28.0204 29.8608 25.4772 27.3469 25.4772 24.2446C25.4772 21.1423 28.0204 18.6284 31.1587 18.6284C34.297 18.6284 36.8401 21.1423 36.8401 24.2446C36.8401 27.3469 34.2969 29.8608 31.1587 29.8608ZM31.1587 21.2982C29.5132 21.2982 28.1806 22.6155 28.1806 24.2421C28.1806 25.8686 29.5132 27.1859 31.1587 27.1859C32.8041 27.1859 34.1367 25.8686 34.1367 24.2421C34.1367 22.618 32.8041 21.2982 31.1587 21.2982ZM17.3442 24.2446C17.3442 25.8711 16.0115 27.1884 14.3661 27.1884C12.7207 27.1884 11.3881 25.8711 11.3881 24.2446C11.3881 22.618 12.7207 21.3007 14.3661 21.3007C16.0115 21.2982 17.3442 22.618 17.3442 24.2446Z"
                            fill="black"
                          ></path>
                        </svg>{' '}
                      </div>
                      <div className="content">
                        <div className="text-logo">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="110"
                            height="19"
                            viewBox="0 0 110 19"
                            fill="#fff"
                          >
                            <path d="M109.2 14.2516C108.759 14.2516 108.401 14.602 108.401 15.0334C108.401 15.4648 108.759 15.8151 109.2 15.8151C109.642 15.8151 110 15.4648 110 15.0334C110 14.602 109.642 14.2516 109.2 14.2516ZM109.2 15.6912C108.829 15.6912 108.528 15.3953 108.528 15.0334C108.528 14.6697 108.83 14.3756 109.2 14.3756C109.572 14.3756 109.875 14.6714 109.875 15.0334C109.875 15.3953 109.572 15.6912 109.2 15.6912ZM109.461 14.8995C109.461 14.7574 109.358 14.6731 109.205 14.6731H108.95V15.3854H109.075V15.1276H109.212L109.344 15.3854H109.479L109.334 15.1012C109.412 15.0664 109.461 14.997 109.461 14.8995ZM109.2 15.0168H109.077V14.7805H109.2C109.285 14.7805 109.336 14.8218 109.336 14.8979C109.336 14.9755 109.283 15.0168 109.2 15.0168ZM12.8619 6.33991V4.44917H9.89707V15.6978H12.8619V8.95295C12.8619 7.73156 13.6632 7.13158 14.9124 7.13158H16.5351V4.44921H15.149C14.0638 4.44917 13.1206 5.00283 12.8619 6.33991ZM19.3124 0C18.2981 0 17.5206 0.783414 17.5206 1.77506C17.5206 2.74357 18.2981 3.52698 19.3124 3.52698C20.3266 3.52698 21.1041 2.74357 21.1041 1.77506C21.1041 0.783373 20.3266 0 19.3124 0ZM17.8333 15.6978H20.7914V4.44917H17.8333V15.6978ZM34.8822 10.0735C34.8822 13.2847 32.2199 15.8879 28.9355 15.8879C27.6103 15.8879 26.4084 15.4631 25.4449 14.7458V19H22.4868V4.44917H25.4449V5.40113C26.4084 4.68386 27.6103 4.2591 28.9355 4.2591C32.2199 4.2591 34.8822 6.86219 34.8822 10.0735ZM31.9055 10.0735C31.9055 8.32983 30.4586 6.91505 28.6752 6.91505C26.8919 6.91505 25.445 8.32983 25.445 10.0735C25.445 11.8171 26.8919 13.2319 28.6752 13.2319C30.4586 13.2319 31.9055 11.8188 31.9055 10.0735ZM86.2961 9.08679L84.5702 8.62402C83.4344 8.33477 82.9932 7.99431 82.9932 7.4076C82.9932 6.83573 83.6152 6.43578 84.5043 6.43578C85.3512 6.43578 86.0155 6.97787 86.0155 7.67201V7.73645H88.7421V7.67201C88.7421 5.63084 87.0399 4.25906 84.5043 4.25906C81.9942 4.25906 80.1703 5.62918 80.1703 7.51827C80.1703 8.98757 81.1659 10.0949 82.9035 10.5544L84.5567 10.9957C85.8126 11.3361 86.2792 11.713 86.2792 12.389C86.2792 13.1013 85.6048 13.5806 84.6006 13.5806C83.5543 13.5806 82.8494 12.9327 82.8494 11.9708V11.9063H79.9556V11.9708C79.9556 14.278 81.8555 15.8911 84.5771 15.8911C87.1988 15.8911 89.1021 14.3161 89.1021 12.1476C89.1021 11.0833 88.6152 9.69171 86.2961 9.08679ZM45.376 4.44917H48.3341V15.6978H45.376V14.7457C44.4125 15.4631 43.2106 15.8878 41.8854 15.8878C38.6011 15.8878 35.9387 13.2847 35.9387 10.0734C35.9387 6.8621 38.6011 4.25906 41.8854 4.25906C43.2106 4.25906 44.4125 4.68381 45.376 5.40109V4.44917ZM45.376 10.0735C45.376 8.32818 43.929 6.91505 42.1457 6.91505C40.3623 6.91505 38.9154 8.32983 38.9154 10.0735C38.9154 11.8171 40.3623 13.2319 42.1457 13.2319C43.9307 13.2319 45.376 11.8188 45.376 10.0735ZM59.0155 0.446232H61.9736V15.6994H59.0155V14.7474C58.0519 15.4647 56.8501 15.8895 55.5249 15.8895C52.2405 15.8895 49.5782 13.2864 49.5782 10.0751C49.5782 6.86376 52.2404 4.26072 55.5249 4.26072C56.8501 4.26072 58.0519 4.68547 59.0155 5.40275V0.446232ZM59.0155 10.0735C59.0155 8.32983 57.5685 6.91505 55.7851 6.91505C54.0019 6.91505 52.5549 8.32983 52.5549 10.0735C52.5549 11.8171 54.0001 13.2319 55.7851 13.2319C57.5685 13.2319 59.0155 11.8188 59.0155 10.0735ZM75.7077 15.6978H78.6658V4.44917H75.7077V15.6978ZM77.1868 0C76.1725 0 75.395 0.783414 75.395 1.77506C75.395 2.74357 76.1725 3.52698 77.1868 3.52698C78.201 3.52698 78.9785 2.74357 78.9785 1.77506C78.9785 0.783373 78.201 0 77.1868 0ZM101.888 10.0735C101.888 13.2847 99.2256 15.8879 95.9412 15.8879C92.6569 15.8879 89.9946 13.2848 89.9946 10.0735C89.9946 6.86215 92.6569 4.2591 95.9412 4.2591C99.2256 4.2591 101.888 6.86219 101.888 10.0735ZM99.1716 10.0735C99.1716 8.32983 97.7246 6.91505 95.9413 6.91505C94.1579 6.91505 92.711 8.32983 92.711 10.0735C92.711 11.8171 94.1562 13.2319 95.9413 13.2319C97.7246 13.2319 99.1716 11.8188 99.1716 10.0735ZM11.3474 0.446232H0V3.02618H4.20056V15.6978H7.14854V3.02618H11.3491V0.446232H11.3474ZM68.7333 12.617L66.1014 4.44921H62.9945L66.9415 15.6978H70.5014L74.472 4.44921H71.3651L68.7333 12.617ZM106.222 6.33991V4.44917H103.257V15.6978H106.222V8.95295C106.222 7.73156 107.023 7.13158 108.272 7.13158H109.895V4.44921H108.509C107.424 4.44917 106.482 5.00283 106.222 6.33991Z"></path>
                          </svg>
                        </div>
                        <div className="w-16">
                          <span> 5.0 /5.0</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {/* Navigation buttons */}
          <button
            type="button"
            className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
            onClick={handlePrev}
          >
            <span className="inline-block p-2 text-white bg-black rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </span>
          </button>
          <button
            type="button"
            className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
            onClick={handleNext}
          >
            <span className="inline-block p-2 text-white bg-black rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded shadow-md w-11/12 p-2 absolute -bottom-10 lg:left-16 left-2 z-10">
        <div className="grid lg:grid-cols-5 md:grid-cols-2 grid-cols-5 gap-2 items-center">
          {
            isGalleryLoading ? (
              Array.from({ length: 4 }).map((_, index) => (
                <>
                  <div key={index}>
                    <Skeleton className="w-full lg:h-20 h-8 object-cover rounded-md" />
                  </div>
                </>
              ))
            ) : (
              galleryData.length > 0 ? (
                galleryData.map((gallery, index) => (
                  <>
                    <div key={index}>
                      <Image
                        src={gallery?.imageUrl ?? 'home/hore-slider-1.webp'}
                        alt={gallery?.image}
                        width={500}
                        height={500}
                        className="w-full lg:h-20 h-8 object-cover rounded-md"
                      />
                    </div>
                  </>
                ))
              ) : (
                Array.from({ length: 4 }).map((_, index) => (
                  <>
                    <div key={index}>
                      <Image
                        src={'/home/hore-slider-1.webp'}
                        alt='home'
                        width={500}
                        height={500}
                        className="w-full lg:h-20 h-8 object-cover rounded-md"
                      />
                    </div>
                  </>
                ))
              )
            )
          }

          <div className='text-center'>
            <Link href="/gallery" className="bg-[#b0191e] text-white font-semibold uppercase w-full px-10 py-3 lg:text-base text-[10px] rounded">
              Search
            </Link>
          </div>
        </div>
      </div>
    </div >
  );
};

export default HomeHero;