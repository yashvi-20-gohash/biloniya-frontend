'use client';

import React from 'react';
import Image from 'next/image';
import dayjs from 'dayjs';
import HeroImage from '../../../../public/home/harry-up-card-1.png';

const dummyBlogData = {
    blog: {
        blogImageUrl: null,
        authorName: 'By, Shafiqul',
        publishedAt: '2023-12-25',
        title: 'Unveiling the the Travels 10 Must - Visit Places in Delhi',
        description: ' Discover the attractions and top 10 places to visit in Delhi with Taj Hotels. Explore the city and uncover some of its unique heritage, architecture, culture, and experiences. Know more! Discover the attractions and top 10 places to visit in Delhi with Taj Hotels. Explore the city and uncover some of its unique heritage, architecture, culture, and experiences. Know more!Discover the attractions and top 10 places to visit in Delhi with Taj Hotels. Explore the city and uncover some of its unique heritage, architecture, culture, and experiences. Know more!Discover the attractions and top 10 places to visit in Delhi with Taj Hotels. Explore the city and uncover some of its unique heritage, architecture, culture, and experiences. Know more!Discover the attractions and top 10 places to visit in Delhi with Taj Hotels. Explore the city and uncover some of its unique heritage, architecture, culture, and experiences. Know more! ',
        title1: 'Unveiling the Hotel 10 Must - Visit Places in Delhi',
        description1: ' Discover the attractions and top 10 places to visit in Delhi with Taj Hotels. Explore the city and uncover some of its unique heritage, architecture, culture, and experiences. Know more! Discover the attractions and top 10 places to visit in Delhi with Taj Hotels. Explore the city and uncover some of its unique heritage, architecture, culture, and experiences. Know more!Discover the attractions and top 10 places to visit in Delhi with Taj Hotels. Explore the city and uncover some of its unique heritage, architecture, culture, and experiences. Know more!Discover the attractions and top 10 places to visit in Delhi with Taj Hotels. Explore the city and uncover some of its unique heritage, architecture, culture, and experiences. Know more!Discover the attractions and top 10 places to visit in Delhi with Taj Hotels. Explore the city and uncover some of its unique heritage, architecture, culture, and experiences. Know more! ',
        category: 'Technology',
        tags: ['React', 'Next.js', 'Tailwind CSS'],
    },
    recentBlog: [
        {
            _id: '1',
            blogImageUrl: null,
            title: ' Unveiling the Hidden Gems:10 Must - Visit Places in Delhi Unveiling the Hidden Gems:10 Must - Visit Places in Delhi ',
            publishedAt: '2023-12-20',
        },
        {
            _id: '2',
            blogImageUrl: null,
            title: ' Unveiling the Hidden Gems:10 Must - Visit Places in Delhi Unveiling the Hidden Gems:10 Must - Visit Places in Delhi ',
            publishedAt: '2023-12-18',
        },
        {
            _id: '3',
            blogImageUrl: null,
            title: ' Unveiling the Hidden Gems:10 Must - Visit Places in Delhi Unveiling the Hidden Gems:10 Must - Visit Places in Delhi ',
            publishedAt: '2023-12-15',
        },
    ],
};

export default function BlogDetails() {
    const { blog, recentBlog } = dummyBlogData;

    return (
        <div className="max-w-screen-xl mx-auto">
            {/* Blog Details */}
            <div className="lg:flex gap-6 mt-14">
                <div className="lg:w-8/12 px-4">
                    <div className="blog-details-desc">
                        <div className="article-image">
                            <Image
                                src={blog.blogImageUrl || HeroImage}
                                className="w-full object-cover h-96 rounded-lg"
                                width={1500}
                                height={1500}
                                alt="Blog"
                            />
                        </div>
                        <div className="article-content mt-4">
                            <div className="entry-meta mb-4">
                                <ul className="flex space-x-4 text-sm text-gray-500">
                                    <li>
                                        <span className="font-medium">Author:</span> {blog.authorName}
                                    </li>
                                    <li>
                                        <span className="font-medium">Published:</span>{' '}
                                        {dayjs(blog.publishedAt).format('MMMM DD, YYYY')}
                                    </li>
                                </ul>
                            </div>
                            <div className='mb-4'>
                                <h3 className="text-2xl font-semibold mb-4">{blog.title}</h3>
                                <p className="text-base text-gray-700 leading-7 text-justify">{blog.description}</p>
                            </div>

                            <div>
                                <h3 className="text-2xl font-semibold mb-4">{blog.title1}</h3>
                                <p className="text-base text-gray-700 leading-7 text-justify">{blog.description1}</p>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="lg:w-4/12 px-4">
                    <aside className="space-y-8">
                        {/* Categories */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold mb-4">Categories</h3>
                            <p className="text-gray-700">{blog.category}</p>
                        </div>

                        {/* Tags */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold mb-4">Popular Tags</h3>
                            <div className="flex flex-wrap gap-2">
                                {blog.tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="bg-gray-200 text-gray-700 rounded px-3 py-1 text-sm"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>
            </div>

            {/* Recent Posts */}
            <div className="mt-12">
                <h3 className="text-xl font-semibold mb-4">Recent Posts</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {recentBlog.map((post) => (
                        <div
                            key={post._id}
                            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                        >
                            <div className="flex items-start space-x-4">
                                <Image
                                    src={post.blogImageUrl || HeroImage}
                                    className="w-20 h-20 object-cover rounded-md"
                                    width={500}
                                    height={500}
                                    alt="Recent Blog"
                                />
                                <div>
                                    <span className="block text-xs text-gray-500">
                                        {dayjs(post.publishedAt).format('MMMM DD, YYYY')}
                                    </span>
                                    <h4 className="text-sm font-semibold">{post.title}</h4>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
