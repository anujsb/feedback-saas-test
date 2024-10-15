'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import FormDisplay from '@/components/FormDisplay';

const FormPage = () => {
  const [form, setForm] = useState(null);
  const { userId } = useParams();

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const response = await fetch(`/api/forms/${userId}`);
        if (response.ok) {
          const forms = await response.json();
          setForm(forms[0]); // Assuming we're displaying the first form
        } else {
          throw new Error('Failed to fetch form');
        }
      } catch (error) {
        console.error('Error fetching form:', error);
      }
    };

    fetchForm();
  }, [userId]);

  if (!form) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{form.title}</h1>
      <FormDisplay form={form} />
    </div>
  );
};

export default FormPage;