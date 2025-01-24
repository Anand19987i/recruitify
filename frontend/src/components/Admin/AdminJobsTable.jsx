import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Edit2, Eye, MoreHorizontal } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUpdateJob } from '@/redux/jobSlice'; // Import the action

const AdminJobsTable = () => {
    const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
    const [filterJobs, setFilterJobs] = useState(allAdminJobs);
    const dispatch = useDispatch();  // Use dispatch hook
    const navigate = useNavigate();

    useEffect(() => {
        const filteredJobs = allAdminJobs.filter((job) => {
            if (!searchJobByText) return true;
            return (
                job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
                job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase())
            );
        });
        setFilterJobs(filteredJobs);
    }, [allAdminJobs, searchJobByText]);

    const handleEdit = (job) => {
        dispatch(setUpdateJob(job));  // Store job data in Redux
        navigate(`/admin/jobs/${job._id}`);
    };

    return (
        <div>
            <Table>
                <TableCaption>A list of your recently posted jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Company Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filterJobs?.map((job) => (
                        <TableRow key={job._id}>
                            <TableCell>{job?.company?.name}</TableCell>
                            <TableCell>{job?.title}</TableCell>
                            <TableCell>{job?.createdAt.split('T')[0]}</TableCell>
                            <TableCell className="text-right cursor-pointer">
                                <Popover>
                                    <PopoverTrigger>
                                        <MoreHorizontal />
                                    </PopoverTrigger>
                                    <PopoverContent className="w-32">
                                        <div
                                            onClick={() => handleEdit(job)}
                                            className="flex items-center gap-2 w-fit cursor-pointer"
                                        >
                                            <Edit2 className="w-4" />
                                            <span>Edit</span>
                                        </div>
                                        <div
                                            onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                                            className="flex items-center w-fit gap-2 cursor-pointer mt-2"
                                        >
                                            <Eye className="w-4" />
                                            <span>Applicants</span>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default AdminJobsTable;
