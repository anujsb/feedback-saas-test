import { NextApiRequest, NextApiResponse } from 'next';
import { getAuth } from '@clerk/nextjs/server';
import dbConnect from '@/lib/mongodb';
import { Form } from '../../../models/Form';
import { Submission } from '../../../models/Submission';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = getAuth(req);
  
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    try {
      await dbConnect();
      const forms = await Form.find({ userId });
      const formIds = forms.map(form => form._id);
      const submissions = await Submission.find({ formId: { $in: formIds } }).populate('formId');
      res.status(200).json(submissions);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching submissions' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}