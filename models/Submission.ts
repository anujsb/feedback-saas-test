// models/Submission.ts
import mongoose from 'mongoose';

const SubmissionSchema = new mongoose.Schema({
  formId: { type: mongoose.Schema.Types.ObjectId, ref: 'Form', required: true },
  data: { type: Map, of: mongoose.Schema.Types.Mixed },
  submittedAt: { type: Date, default: Date.now },
});

export const Submission = mongoose.models.Submission || mongoose.model('Submission', SubmissionSchema);