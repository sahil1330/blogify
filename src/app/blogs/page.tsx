"use client"
import React, { useEffect, useState } from 'react';

interface Blog {
  id: number;
  title: string;
  excerpt: string;
  img: string;
  author: string;
  date: string;
}

const BlogCard = ({ title, excerpt, img, author, date }: Blog) => (
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

const BlogSection = ({ title, section }: { title: string; section: string }) => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch(`/api/blogs`)
      .then(res => res.json())
      .then(data => {
        const filtered = data.filter((blog: Blog) => blog.section === section);
        setBlogs(filtered);
      });
  }, [section]);

  const handlePrev = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(prev + 1, blogs.length - 3));
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
          {blogs.slice(currentIndex, currentIndex + 3).map(blog => (
            <BlogCard key={blog.id} {...blog} />
          ))}
        </div>
        <button onClick={handleNext} className="text-xl px-2">›</button>
      </div>
    </div>
  );
};

const Page = () => {
  return (
    <div className="container mx-auto px-4">
      <BlogSection title="Trending Blogs" section="trending" />
      <BlogSection title="Recent Blogs" section="recent" />
    </div>
  );
};

export default Page;