import mongoose, { Schema } from 'mongoose';

const QuestionSchema = new Schema(
  {
    questionText: { type: String, required: true },
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
    isRequired: { type: Boolean, default: false },
    // orderIndex: { type: Number },
    options: [
      {
        optionText: { type: String, required: true },
        orderIndex: { type: Number },
      },
    ],
  },
  { timestamps: true }
);

export const Question = mongoose.model('Question', QuestionSchema);
