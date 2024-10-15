import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongodb';
import { Form } from '../../../../models/Form';
import { Submission } from '../../../../models/Submission';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      await dbConnect();
      const { formId } = req.query;
      const { data } = req.body;
      
      const form = await Form.findById(formId);
      if (!form) {
        return res.status(404).json({ error: 'Form not found' });
      }
      
      const submission = new Submission({ formId, data });
      await submission.save();
      res.status(201).json(submission);
    } catch (error) {
      res.status(500).json({ error: 'Error submitting form' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}