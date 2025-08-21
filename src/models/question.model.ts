import mongoose, { Schema } from 'mongoose';

const QuestionSchema = new Schema(
  {
    type: {
      type: String,
      enum: [
        'short_text',
        'long_text',
        'multiple_choice',
        'checkbox',
        'dropdown',
        'date',
        'time',
      ],
      required: true,
    },
    name: { type: String },
    label: { type: String },
    placeholder: { type: String },
    validation: { type: Array },
    required: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Question = mongoose.model('Question', QuestionSchema);
