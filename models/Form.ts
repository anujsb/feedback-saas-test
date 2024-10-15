// models/Form.ts
import mongoose from 'mongoose';

const FormSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  fields: [{
    label: String,
    type: { type: String, enum: ['text', 'number', 'email', 'checkbox', 'radio'] },
    required: Boolean,
    options: [String] // For radio and checkbox fields
  }],
  createdAt: { type: Date, default: Date.now },
});

export const Form = mongoose.models.Form || mongoose.model('Form', FormSchema);