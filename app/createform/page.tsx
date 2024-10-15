'use client';

import React, { useState } from 'react';
import { SideBar } from '@/components/SideBar';
import { cn } from '@/lib/utils';
import FormBuilder from '@/components/FormBuilder';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

const CreateFormPage = () => {
  const [formFields, setFormFields] = useState([]);
  const [title, setTitle] = useState('');
  const { user } = useUser();
  const router = useRouter();

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/forms/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, fields: formFields }),
      });
      if (response.ok) {
        router.push('/submissions');
      } else {
        throw new Error('Failed to create form');
      }
    } catch (error) {
      console.error('Error creating form:', error);
    }
  };

  return (
    <div className={cn("rounded-md flex flex-col md:flex-row flex-1 w-full overflow-hidden", "h-screen")}>
      <SideBar />
      <div className="flex flex-1 flex-col items-center p-8 w-full">
        <h1 className="text-2xl font-bold mb-4">Create Form</h1>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Form Title"
          className="w-full max-w-md mb-4 p-2 border rounded"
        />
        <FormBuilder fields={formFields} setFields={setFormFields} />
        <button
          onClick={handleSubmit}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Create Form
        </button>
      </div>
    </div>
  );
};

export default CreateFormPage;