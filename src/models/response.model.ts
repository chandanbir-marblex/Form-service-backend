import mongoose, { Schema } from 'mongoose';

const ResponseSchema = new Schema(
  {
    formId: { type: Schema.Types.ObjectId, ref: 'Form', required: true },
    answers: [
      {
        questionId: { type: Schema.Types.ObjectId, ref: 'Question' }, // reference to Form.questions._id
        answerText: { type: String },
      },
    ],
    // Additional metadata fields
    submittedAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
    // You can add more fields as needed, e.g. userId, status, etc.
  },
  { timestamps: { createdAt: 'submittedAt', updatedAt: 'updatedAt' } }
);

export const Responses = mongoose.model('Response', ResponseSchema);
