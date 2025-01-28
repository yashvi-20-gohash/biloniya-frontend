import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

type Blog = {
  id: number;
  date: string;
  author: string;
  category: string;
  title: string;
  readTime: string;
  image: string;
};

const Blog: React.FC = () => {
  const blogs: Blog[] = [
    {
      id: 1,
      date: 'Feb 6, 2024',
      author: 'Shafiqul',
      category: 'Uncategorized',
      title: 'Spiritual Sojourn: Pilgrimage Tours for Soul Seekers',
      readTime: '19 Min Read',
      image: '/home/blog-1.webp',
    },
    {
      id: 2,
      date: 'Feb 6, 2024',
      author: 'Shafiqul',
      category: 'Uncategorized',
      title: 'Exploring Hidden Gems: A Traveler’s Guide',
      readTime: '15 Min Read',
      image: '/home/blog-2.webp',
    },
    {
      id: 3,
      date: 'Feb 6, 2024',
      author: 'Shafiqul',
      category: 'Travel Tips',
      title: '10 Essential Packing Tips for Stress-Free Travel',
      readTime: '10 Min Read',
      image: '/home/blog-3.webp',
    },
    {
      id: 4,
      date: 'Feb 6, 2024',
      author: 'Shafiqul',
      category: 'Culture',
      title: 'The Art of Cultural Immersion: Lessons from the Road',
      readTime: '12 Min Read',
      image: '/home/blog-4.webp',
    },
  ];

  return (
    <section className="affordable-section">
      <div className="w-full max-w-7xl mx-auto px-4 py-12">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center font-secound gap-3 mb-3">
            <span className="text-xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="16"
                viewBox="0 0 15 16"
                fill="#b0191e"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M1.92556 7.69046C2.35744 7.63298 2.78906 7.57563 3.21925 7.51077..."
                ></path>
              </svg>
            </span>
            <span className="text-[#b0191e] text-base"> Latest Blog </span>
            <span className="text-xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="16"
                viewBox="0 0 15 16"
                fill="#b0191e"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M13.0744 8.30954C12.6426 8.36702 12.2109 8.42437 11.7807 8.48923..."
                ></path>
              </svg>
            </span>
          </div>
          <h2 className="lg:text-4xl text-2xl font-bold">Latest Travel Blog</h2>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div key={blog.id}>
              <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                <div className="relative">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-[308px] object-cover"
                    width={1000}
                    height={1000}
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-4 text-xs font-semibold text-gray-300 mb-4">
                    <span>
                      By <Link href="#">{blog.author}</Link>
                    </span>
                    <span>{blog.date}</span>
                    <span>2 Comments</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-5 hover:text-[#b0191e] transition-colors duration-300 line-clamp-2">
                    {blog.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <button className="flex items-center gap-2 text-sm font-semibold text-[#b0191e] hover:gap-3 transition-all duration-300">
                      View Post
                      <span className="border w-6 h-6 rounded-full flex justify-center items-center">
                        <ArrowUpRight size={15} />
                      </span>
                    </button>
                    <div className="flex gap-2 items-center text-xs font-semibold">
                      <svg xmlns="http://www.w3.org/2000/svg" width="9" height="12" viewBox="0 0 9 12">
                        <path d="M5.85726 11.3009C7.14547 9.08822 6.60613 6.30362 4.57475 4.68025..."></path>
                      </svg>
                      <span>{blog.readTime}</span>
                    </div>
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

export default Blog;
