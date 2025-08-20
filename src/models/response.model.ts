import mongoose, { Schema } from 'mongoose';

const ResponseSchema = new Schema(
  {
    form: { type: Schema.Types.ObjectId, ref: 'Form', required: true },

    // Each response has multiple answers
    answers: [
      {
        questionId: { type: Schema.Types.ObjectId }, // reference to Form.questions._id
        answerText: { type: String }, // for text/date/time
        optionIds: [{ type: Schema.Types.ObjectId }], // for selected options
      },
    ],
  },
  { timestamps: { createdAt: 'submittedAt' } }
);

module.exports = mongoose.model('Response', ResponseSchema);
