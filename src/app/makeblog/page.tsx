"use client";

import React from 'react';
import CreateBlogForm from './CreateBlogForm';

const CreateBlogPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <CreateBlogForm />
    </div>
  );
};

export default CreateBlogPage;