"use client"
import React, { useState } from 'react';


const BlogCard = ({ title, excerpt, img, author, date }) => (
  <div className="w-1/3 bg-white shadow-md rounded-lg overflow-hidden">
    <img src={img} alt={title} className="w-full h-48 object-cover" />
    <div className="p-4">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-gray-600">{excerpt}</p>
      <div className="mt-2 text-sm text-gray-500">
        By {author} on {date}
      </div>
    </div>
  </div>
);

const BlogSection = ({ title, blogs }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, blogs.length - 3));
  };

  return (
    <div className="my-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <button className="text-blue-500">View All</button>
      </div>
      <div className="flex items-center">
        <button onClick={handlePrev} className="text-xl px-2">‹</button>
        <div className="flex space-x-4 overflow-hidden">
          {blogs.slice(currentIndex, currentIndex + 4).map((blog) => (
            <BlogCard
              key={blog.id}
              title={blog.title}
              excerpt={blog.excerpt}
              img={blog.img}
              author={blog.author}
              date={blog.date}
            />
          ))}
        </div>
        <button onClick={handleNext} className="text-xl px-2">›</button>
      </div>
    </div>
  );
};

const Page = () => {
  const trendingBlogs = [
    { id: 1, title: 'Trending Blog 1', excerpt: 'Excerpt for trending blog 1.', img: '/images/trending1.jpg', author: 'Author A', date: '2023-10-01' },
    { id: 2, title: 'Trending Blog 2', excerpt: 'Excerpt for trending blog 2.', img: '/images/trending2.jpg', author: 'Author B', date: '2023-10-02' },
    { id: 3, title: 'Trending Blog 3', excerpt: 'Excerpt for trending blog 3.', img: '/images/trending3.jpg', author: 'Author C', date: '2023-10-03' },
    { id: 4, title: 'Trending Blog 4', excerpt: 'Excerpt for trending blog 4.', img: '/images/trending4.jpg', author: 'Author D', date: '2023-10-04' },
  ];

  const recentBlogs = [
    { id: 5, title: 'Recent Blog 1', excerpt: 'Excerpt for recent blog 1.', img: '/images/recent1.jpg', author: 'Author E', date: '2023-09-25' },
    { id: 6, title: 'Recent Blog 2', excerpt: 'Excerpt for recent blog 2.', img: '/images/recent2.jpg', author: 'Author F', date: '2023-09-26' },
    { id: 7, title: 'Recent Blog 3', excerpt: 'Excerpt for recent blog 3.', img: '/images/recent3.jpg', author: 'Author G', date: '2023-09-27' },
    { id: 8, title: 'Recent Blog 4', excerpt: 'Excerpt for recent blog 4.', img: '/images/recent4.jpg', author: 'Author H', date: '2023-09-28' },
  ];

  return (
    <div className="container mx-auto px-4">
      <BlogSection title="Trending Blogs" blogs={trendingBlogs} />
      <BlogSection title="Recent Blogs" blogs={recentBlogs} />
    </div>
  );
};

export default Page;