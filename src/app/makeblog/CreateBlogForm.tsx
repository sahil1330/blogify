"use client";
import React, { useState } from 'react';

interface Blog {
  title: string;
  excerpt: string;
  content: string;
  img: string;
  video: string;
  author: string;
  date: string;
  section: string;
}

const CreateBlogForm: React.FC = () => {
  const [formData, setFormData] = useState<Blog>({
    title: '',
    excerpt: '',
    content: '',
    img: '',
    video: '',
    author: '',
    date: new Date().toISOString().split('T')[0],
    section: 'recent',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Blog created successfully!');
        setFormData({
          title: '',
          excerpt: '',
          content: '',
          img: '',
          video: '',
          author: '',
          date: new Date().toISOString().split('T')[0],
          section: 'recent',
        });
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error creating blog:', error);
      alert('An unexpected error occurred.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Create New Blog</h2>

      <div className="mb-4">
        <label className="block text-gray-700">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Excerpt</label>
        <textarea
          name="excerpt"
          value={formData.excerpt}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          rows={3}
        ></textarea>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Content</label>
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          rows={6}
        ></textarea>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Image URL</label>
        <input
          type="url"
          name="img"
          value={formData.img}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Video URL</label>
        <input
          type="url"
          name="video"
          value={formData.video}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          placeholder="https://example.com/video.mp4"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Author Name</label>
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Section</label>
        <select
          name="section"
          value={formData.section}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        >
          <option value="trending">Trending</option>
          <option value="recent">Recent</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
      >
        Create Blog
      </button>
    </form>
  );
};

export default CreateBlogForm;