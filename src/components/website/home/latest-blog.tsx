import React from 'react'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link';
import { Facebook, Twitter, Linkedin, Instagram, } from "lucide-react";
import Image from 'next/image';

type Blog = {
  id: number;
  date: string;
  author: string;
  category: string;
  title: string;
  readTime: string;
  image: string;
}

const LatestBlog: React.FC = () => {
  const blogs: Blog[] = [
    {
      id: 1,
      date: 'Feb 6, 2024',
      author: 'Shafiqul',
      category: 'Uncategorized',
      title: 'Spiritual Sojourn: Pilgrimage Tours for Soul Seekers',
      readTime: '19 Min Read',
      image: '/home/blog-1.webp'
    },
    {
      id: 2,
      date: '6 Feb',
      author: 'Shafiqul',
      category: 'Cruise Voyage',
      title: 'Spiritual Sojourn: Pilgrimage Tours for Soul Seekers',
      readTime: '1 Min Read',
      image: '/home/blog-2.webp'
    },
    {
      id: 3,
      date: '6 Feb',
      author: 'Shafiqul',
      category: 'Adventure Safari',
      title: 'Wine Country Escapes: Vineyard Tours for Connoisseurs',
      readTime: '1 Min Read',
      image: '/home/blog-3.webp'
    },
    {
      id: 4,
      date: '6 Feb',
      author: 'Shafiqul',
      category: 'Adventure Safari',
      title: 'Wine Country Escapes: Vineyard Tours for Connoisseurs',
      readTime: '1 Min Read',
      image: '/home/blog-4.webp'
    }
  ]
  const socialMediaLinks = [
    { icon: <Facebook className="w-5 h-5" />, href: "#" },
    { icon: <Twitter className="w-5 h-5" />, href: "#" },
    { icon: <Linkedin className="w-5 h-5" />, href: "#" },
    { icon: <Instagram className="w-5 h-5" />, href: "#" },
  ];
  return (
    <section className='affodable-section'>
      <div className="w-full max-w-7xl mx-auto px-4 py-12">
        {/* Section Header */}

        <div className="text-center mb-10">
          <div className="flex items-center justify-center font-secound gap-3 mb-3">
            <span className="text-xl">
              {" "}
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="16" viewBox="0 0 15 16" fill="#b0191e">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M1.92556 7.69046C2.35744 7.63298 2.78906 7.57563 3.21925 7.51077C4.14925 7.37065 5.08588 7.29138 6.01763 7.21249L6.01888 7.21243C6.15888 7.20055 6.29875 7.18874 6.43844 7.17668C7.50663 6.968 8.58732 6.89083 9.66644 6.94628C10.7733 7.06837 11.8592 7.41421 12.8857 7.97163L12.8857 8.23655C11.8592 8.79397 10.7733 9.13981 9.66644 9.26191C8.58732 9.31735 7.50663 9.24018 6.43844 9.03151C5.36831 8.93932 4.29813 8.82412 3.21925 8.69742C2.14031 8.57065 1.07012 8.42092 -6.78702e-07 8.23655L-7.01862e-07 7.97163C0.639938 7.86135 1.28306 7.77588 1.92556 7.69046ZM10.7633 15.8502C10.9332 15.4596 11.12 15.0855 11.3061 14.7127C11.389 14.5468 11.4717 14.3811 11.5527 14.2144C11.8159 13.6729 12.1141 13.1545 12.4299 12.6477C12.5448 12.4632 12.64 12.2604 12.7336 12.061C12.8972 11.7124 13.056 11.3741 13.3071 11.1616C13.7816 10.7768 14.3283 10.5734 14.886 10.574L15 10.7353C14.9945 11.4677 14.8235 12.1813 14.5088 12.7859C14.3311 13.1802 14.0336 13.4059 13.7358 13.6317C13.6073 13.7292 13.4787 13.8268 13.3597 13.9379C12.965 14.3066 12.5615 14.6637 12.1492 15.0093C11.7369 15.3549 11.3159 15.689 10.8685 16L10.7633 15.8502ZM11.7543 0.665536C11.4882 0.436859 11.2226 0.208798 10.9388 -1.5523e-06L10.816 0.149784C11.0528 0.725784 11.3072 1.27877 11.5703 1.82018C11.8335 2.3616 12.1142 2.89157 12.3949 3.40997C12.4795 3.56628 12.5538 3.73514 12.628 3.90394C12.8 4.29501 12.9718 4.68572 13.2721 4.91908C13.7312 5.33563 14.2754 5.56049 14.8334 5.56418L14.9562 5.4144C14.9651 4.68055 14.8095 3.95951 14.5089 3.3408C14.3471 3.01108 14.0894 2.80252 13.824 2.58763C13.6722 2.46474 13.5178 2.33975 13.3773 2.1888C12.9914 1.77409 12.6142 1.3824 12.1931 1.0368C12.0446 0.91489 11.8994 0.790152 11.7543 0.665536Z"
                ></path>
              </svg>
            </span>
            <span className="text-[#b0191e] text-base"> Latest Blog </span>
            <span className="text-xl">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="16" viewBox="0 0 15 16" fill="#b0191e">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M13.0744 8.30954C12.6426 8.36702 12.2109 8.42437 11.7807 8.48923C10.8507 8.62935 9.91412 8.70862 8.98237 8.78751L8.98112 8.78757C8.84112 8.79945 8.70125 8.81126 8.56156 8.82332C7.49337 9.032 6.41268 9.10917 5.33356 9.05372C4.22669 8.93163 3.14081 8.58578 2.11432 8.02837V7.76345C3.14081 7.20603 4.22669 6.86018 5.33356 6.73809C6.41268 6.68265 7.49337 6.75982 8.56156 6.96849C9.63169 7.06068 10.7019 7.17588 11.7807 7.30259C12.8597 7.42935 13.9299 7.57908 15 7.76345V8.02837C14.3601 8.13865 13.7169 8.22412 13.0744 8.30954ZM4.23673 0.14976C4.06677 0.540388 3.88 0.914468 3.69388 1.28726C3.61104 1.45317 3.52831 1.61887 3.44728 1.78561C3.18413 2.32705 2.88589 2.84546 2.57011 3.35234C2.45519 3.5368 2.36002 3.73958 2.26642 3.939C2.10282 4.28757 1.94402 4.62593 1.69294 4.83843C1.21844 5.2232 0.671682 5.42665 0.114031 5.42597L0 5.26468C0.00551875 4.53235 0.176481 3.81866 0.491219 3.2141C0.6689 2.81982 0.966407 2.59414 1.26418 2.36828C1.39271 2.27078 1.52129 2.17324 1.64031 2.06209C2.03504 1.69345 2.43853 1.33633 2.8508 0.990726C3.26307 0.645126 3.68411 0.31104 4.13147 0L4.23673 0.14976ZM3.24568 15.3345C3.51184 15.5631 3.77735 15.7912 4.06123 16L4.18404 15.8502C3.9472 15.2742 3.69281 14.7212 3.42966 14.1798C3.16651 13.6384 2.88581 13.1084 2.60511 12.59C2.52048 12.4337 2.44621 12.2649 2.37198 12.0961C2.19999 11.705 2.02816 11.3143 1.72794 11.0809C1.26879 10.6644 0.7246 10.4395 0.166563 10.4358L0.0437562 10.5856C0.0348937 11.3194 0.190456 12.0405 0.491113 12.6592C0.652919 12.9889 0.910556 13.1975 1.17597 13.4124C1.32782 13.5353 1.48222 13.6602 1.62268 13.8112C2.00863 14.2259 2.38582 14.6176 2.80686 14.9632C2.95538 15.0851 3.10063 15.2098 3.24568 15.3345Z"
                ></path>
              </svg>
            </span>
          </div>
          <h2 className="lg:text-4xl text-2xl font-bold"> Latest Travel Blog
          </h2>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Featured Blog */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="relative">
                <Image src={blogs[0].image} alt={blogs[0].title} className="w-full h-[308px] object-cover" width={1000}
                  height={1000} />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-4 text-xs font-semibold  text-gray-300 mb-4">
                  <span>By <Link href="#">{blogs[0].author}</Link></span>
                  <span>{blogs[0].date}</span>
                  <span> 2 Comment </span>
                </div>
                <h3 className="text-xl font-semibold mb-5 hover:text-[#b0191e] transition-colors duration-300">
                  {blogs[0].title}
                </h3>
                <div className="flex items-center justify-between">
                  <button className="flex items-center gap-2 text-sm font-semibold text-[#b0191e] hover:gap-3 transition-all duration-300">
                    View Post
                    <span className='border w-6 h-6 rounded-full flex justify-center items-center'>
                      <ArrowUpRight size={15} />
                    </span>
                  </button>

                  <div className="flex gap-4">
                    {socialMediaLinks.map((link, index) => (
                      <a key={index} href={link.href} className="hover:text-[#b0191e] text-sm">
                        {link.icon}
                      </a>
                    ))}
                  </div>

                </div>
              </div>
            </div>
          </div>

          {/* Right Column Blogs */}
          <div className="lg:col-span-7 space-y-8">
            {blogs.slice(1).map(blog => (
              <div key={blog.id} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                <div className="flex flex-col md:flex-row">
                  <div className="relative md:w-1/3">
                    <Image src={blog.image} alt={blog.title} className="w-full h-24 md:h-[8.5rem] object-cover" width={1000}
                      height={1000} />
                    <div className="absolute top-2 left-2 bg-white rounded-full p-1 text-center h-12 w-12">
                      <div className="font-bold text-gray-900 text-xs mt-1">{blog.date.split(' ')[0]}</div>
                      <div className=" text-gray-600 text-xs">{blog.date.split(' ')[1]}</div>
                    </div>
                  </div>
                  <div className="py-3 px-5 md:w-2/3">
                    <div className="flex items-center gap-4 text-xs font-semibold  text-gray-400 mb-2">
                      <span>By <Link href="#">{blogs[0].author}</Link></span>
                      <span>{blogs[0].date}</span>
                      <span> 2 Comment </span>
                    </div>
                    <h3 className="text-sm lg:text-lg font-semibold mb-2 hover:text-[#b0191e] transition-colors duration-300">
                      {blogs[0].title}
                    </h3>
                    <div className="flex items-center justify-between">
                      <button className="flex items-center gap-2 text-sm font-semibold text-[#b0191e] hover:gap-3 transition-all duration-300">
                        View Post
                        <span className='border w-6 h-6 rounded-full flex justify-center items-center'>
                          <ArrowUpRight size={15} />
                        </span>
                      </button>
                      <div className="flex gap-4">
                        {socialMediaLinks.map((link, index) => (
                          <a key={index} href={link.href} className="hover:text-[#b0191e] text-sm">
                            {link.icon}
                          </a>
                        ))}
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default LatestBlog
