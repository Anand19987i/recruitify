import React from 'react';
import { useSelector } from 'react-redux';
import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell } from './ui/table';
import { Badge } from './ui/badge';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';  // Optionally, you can use a date formatter

const AppliedJobsTable = () => {
  const { allAppliedJobs } = useSelector(store => store.job);

  return (
    <div>
      <Table>
        <TableCaption>A list of your applied jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className='text-right'>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAppliedJobs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                You haven't applied for any jobs yet.
              </TableCell>
            </TableRow>
          ) : (
            allAppliedJobs.map((appliedJob) => (
              <TableRow key={appliedJob._id}>
                <TableCell>
                  {format(new Date(appliedJob?.createdAt), 'MM/dd/yyyy')} {/* Formatted date */}
                </TableCell>
                <TableCell>{appliedJob?.job?.title}</TableCell>

                <TableCell className=""><Link to={`/description/${appliedJob._id}`}>{appliedJob?.job?.company?.name}</Link></TableCell>

                <TableCell className="text-right">
                  <Badge
                    className={`${appliedJob?.status === "rejected"
                        ? 'bg-red-400'
                        : appliedJob.status === 'pending'
                          ? 'bg-gray-400'
                          : 'bg-green-400'
                      }`}
                  >
                    {appliedJob.status.toUpperCase()}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobsTable;
