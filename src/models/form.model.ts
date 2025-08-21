import { randomUUID } from 'crypto';
import mongoose from 'mongoose';

const FormSchema = new mongoose.Schema(
  {
    // user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String },
    theme: { type: Object }, // or a dedicated ThemeSchema
    steps: [
      {
        id: { type: String, default: () => randomUUID() },
        title: String,
        elements: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
      },
    ],
    settings: { type: Object },
    published: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Form = mongoose.model('Form', FormSchema);
