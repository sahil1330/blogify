"use client";
import React from 'react';

interface Blog {
  id: number;
  title: string;
  views: number;
  likes: number;
}

const NavBar: React.FC = () => {
  const handleCreateBlog = () => {
    // Placeholder for create blog functionality
    alert('Navigate to Create Blog page');
  };

  return (
    <nav className="bg-blue-600 p-4 flex justify-between items-center">
      <h1 className="text-white text-xl font-bold">Blog Dashboard</h1>
      <button
        onClick={handleCreateBlog}
        className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200"
      >
        Create Blog
      </button>
    </nav>
  );
};

const BlogAnalysisTable: React.FC = () => {
  const blogs: Blog[] = [
    { id: 1, title: 'Understanding React Hooks', views: 1500, likes: 300 },
    { id: 2, title: 'A Guide to Next.js', views: 2000, likes: 450 },
    { id: 3, title: 'TailwindCSS Tips', views: 1800, likes: 400 },
    { id: 4, title: 'State Management with Redux', views: 1200, likes: 250 },
    { id: 5, title: 'TypeScript Basics', views: 1700, likes: 350 },
  ];

  const handleEdit = (id: number) => {
    // Placeholder for edit functionality
    alert(`Edit blog with ID: ${id}`);
  };

  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr>
            <th className="py-2 px-4 bg-gray-200">Title</th>
            <th className="py-2 px-4 bg-gray-200">Views</th>
            <th className="py-2 px-4 bg-gray-200">Likes</th>
            <th className="py-2 px-4 bg-gray-200">Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog.id} className="text-center">
              <td className="py-2 px-4 border">{blog.title}</td>
              <td className="py-2 px-4 border">{blog.views}</td>
              <td className="py-2 px-4 border">{blog.likes}</td>
              <td className="py-2 px-4 border">
                <button
                  onClick={() => handleEdit(blog.id)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <div className="container mx-auto mt-8">
        <BlogAnalysisTable />
      </div>
    </div>
  );
};

export default Dashboard;