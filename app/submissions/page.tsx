'use client';

import React, { useEffect, useState } from 'react';
import { SideBar } from '@/components/SideBar';
import { cn } from '@/lib/utils';
import { IconUserBolt } from '@tabler/icons-react';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useUser } from '@clerk/nextjs';

// Define the types for submission and form
interface Form {
  _id: string;
  title: string;
}

interface Submission {
  formId: Form;
  submittedAt: string; // Assuming submittedAt is a string in ISO format
  data: {
    rating: number; // Assuming a rating field exists in submission data
    [key: string]: any; // other fields in the submission data
  };
}

const SubmissionsPage = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]); // Define the type for submissions
  const { user } = useUser();

  useEffect(() => {
    const fetchSubmissions = async () => {
      if (user) {
        try {
          const response = await fetch(`/api/submissions/${user.id}`);
          if (response.ok) {
            const data: Submission[] = await response.json(); // Define the expected type
            setSubmissions(data);
          } else {
            throw new Error('Failed to fetch submissions');
          }
        } catch (error) {
          console.error('Error fetching submissions:', error);
        }
      }
    };

    fetchSubmissions();
  }, [user]);

  const totalFeedbacks = submissions.length;
  const goodRatings = submissions.filter(s => s.data.rating >= 4).length;
  const badRatings = totalFeedbacks - goodRatings;

  return (
    <div className={cn("rounded-md flex flex-col md:flex-row flex-1 w-full overflow-hidden", "h-screen")}>
      <SideBar />
      <div className="flex flex-1 flex-col items-center m-20 w-full">
        <div className="flex flex-col gap-4 w-full">
          <h1 className="text-start text-2xl font-bold">Submissions</h1>
          <div className="flex flex-row gap-4 mt-4">
            <div className="flex flex-col gap-2 border border-secondary p-4 rounded-md w-full">
              <IconUserBolt className="h-5 w-5 flex-shrink-0" />
              <h1>Total Feedbacks</h1>
              <h1>{totalFeedbacks}</h1>
            </div>
            <div className="flex flex-col gap-2 border border-secondary p-4 rounded-md w-full">
              <IconUserBolt className="h-5 w-5 flex-shrink-0" />
              <h1>Bad Ratings</h1>
              <h1>{badRatings}</h1>
            </div>
            <div className="flex flex-col gap-2 border border-secondary p-4 rounded-md w-full ">
              <IconUserBolt className="h-5 w-5 flex-shrink-0" />
              <h1>Good Ratings</h1>
              <h1>{goodRatings}</h1>
            </div>
          </div>
          <div className="mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Form</TableHead>
                  <TableHead>Submission Date</TableHead>
                  <TableHead>Data</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {submissions.map((submission, index) => (
                  <TableRow key={index}>
                    <TableCell>{submission.formId.title}</TableCell>
                    <TableCell>{new Date(submission.submittedAt).toLocaleDateString()}</TableCell>
                    <TableCell>{JSON.stringify(submission.data)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={2}>Total</TableCell>
                  <TableCell className="text-right">{totalFeedbacks} Feedbacks</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmissionsPage;
