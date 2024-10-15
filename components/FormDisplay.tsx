import React, { useState } from 'react';
import { useParams } from 'next/navigation';

const FormDisplay = ({ form }) => {
  const [formData, setFormData] = useState({});
  const { userId } = useParams();

  const handleInputChange = (e, field) => {
    setFormData({ ...formData, [field.label]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/forms/${form._id}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: formData }),
      });
      if (response.ok) {
        alert('Form submitted successfully!');
        setFormData({});
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {form.fields.map((field, index) => (
        <div key={index}>
          <label className="block mb-2">{field.label}</label>
          {field.type === 'checkbox' ? (
            <input
              type="checkbox"
              checked={formData[field.label] || false}
              onChange={(e) => handleInputChange(e, field)}
              required={field.required}
            />
          ) : field.type === 'radio' ? (
            <div>
              {field.options.map((option, optionIndex) => (
                <label key={optionIndex} className="block">
                  <input
                    type="radio"
                    name={field.label}
                    value={option}
                    checked={formData[field.label] === option}
                    onChange={(e) => handleInputChange(e, field)}
                    required={field.required}
                  />
                  {option}
                </label>
              ))}
            </div>
          ) : (
            <input
              type={field.type}
              value={formData[field.label] || ''}
              onChange={(e) => handleInputChange(e, field)}
              required={field.required}
              className="w-full p-2 border rounded"
            />
          )}
        </div>
      ))}
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Submit
      </button>
    </form>
  );
};

export default FormDisplay;