import React from 'react';

const FormBuilder = ({ fields, setFields }) => {
  const addField = (type) => {
    setFields([...fields, { type, label: '', required: false }]);
  };

  const updateField = (index, key, value) => {
    const updatedFields = [...fields];
    updatedFields[index][key] = value;
    setFields(updatedFields);
  };

  return (
    <div className="w-full max-w-md">
      {fields.map((field, index) => (
        <div key={index} className="mb-4">
          <input
            type="text"
            value={field.label}
            onChange={(e) => updateField(index, 'label', e.target.value)}
            placeholder="Field Label"
            className="w-full p-2 border rounded mb-2"
          />
          <select
            value={field.type}
            onChange={(e) => updateField(index, 'type', e.target.value)}
            className="w-full p-2 border rounded mb-2"
          >
            <option value="text">Text</option>
            <option value="number">Number</option>
            <option value="email">Email</option>
            <option value="checkbox">Checkbox</option>
            <option value="radio">Radio</option>
          </select>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={field.required}
              onChange={(e) => updateField(index, 'required', e.target.checked)}
              className="mr-2"
            />
            Required
          </label>
        </div>
      ))}
      <button
        onClick={() => addField('text')}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Add Field
      </button>
    </div>
  );
};

export default FormBuilder;