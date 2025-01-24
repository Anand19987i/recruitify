import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Button } from '../ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import axios from 'axios';
import { JOB_API_END_POINT } from '@/utils/constant';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import useGetJobById from '@/hooks/useGetJobById';
import { 
    Select, 
    SelectContent, 
    SelectGroup, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from '../ui/select';

const JobSetup = () => {
    const params = useParams();
    useGetJobById(params.id); // Custom hook to fetch job details by ID
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: ""  // Keep this for storing the selected companyId
    });
    
    const { singleJob, updateJob } = useSelector(store => store.job);
    const { companies } = useSelector(store => store.company);
    const { user } = useSelector(store => store.auth);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (singleJob) {
            setInput({
                title: singleJob.title || "",
                description: singleJob.description || "",
                requirements: singleJob.requirements || "",
                salary: singleJob.salary || "",
                location: singleJob.location || "",
                jobType: singleJob.jobType || "",
                experience: singleJob.experienceLevel || "",
                position: singleJob.position || 0,
                companyId: singleJob.companyId || ""
            });
        }
    }, [singleJob]);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find(company => company._id === value);
        setInput({ ...input, companyId: selectedCompany ? selectedCompany._id : "" });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        
        if (!input.companyId) {
            toast.error('Please select a company!');
            return;
        }
    
        const jobData = {
            title: input.title,
            description: input.description,
            requirements: input.requirements, // Ensure it's an array
            salary: Number(input.salary),
            location: input.location,
            jobType: input.jobType,
            experience: Number(input.experience),
            position: Number(input.position),
            companyId: input.companyId, // Ensure this is a valid ObjectId
        };
    
        try {
            setLoading(true);
            const res = await axios.put(`${JOB_API_END_POINT}/update/${params.id}`, jobData, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });
    
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            console.log("Error response:", error.response.data); // Log the error response for debugging
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Navbar />
            <div className='max-w-xl mx-auto my-10'>
                <form onSubmit={submitHandler}>
                    <div className='flex items-center gap-5 p-8'>
                        <Button onClick={() => navigate("/admin/jobs")} variant="outline" className="flex items-center gap-2 text-gray-500 font-semibold">
                            <ArrowLeft />
                            <span>Back</span>
                        </Button>
                        <h1 className='font-bold text-xl'>Job Setup</h1>
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <Label>Job Title</Label>
                            <Input
                                type="text"
                                name="title"
                                value={input.title}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Requirements</Label>
                            <Input
                                type="text"
                                name="requirements"
                                value={input.requirements}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Salary</Label>
                            <Input
                                type="text"
                                name="salary"
                                value={input.salary}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Job Type</Label>
                            <Input
                                type="text"
                                name="jobType"
                                value={input.jobType}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Experience Level</Label>
                            <Input
                                type="text"
                                name="experience"
                                value={input.experience}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>No of Positions</Label>
                            <Input
                                type="number"
                                name="position"
                                value={input.position}
                                onChange={changeEventHandler}
                            />
                        </div>
                        {companies.length > 0 && (
                            <div>
                                <Label>Select Company</Label>
                                <Select onValueChange={selectChangeHandler} value={input.companyId}>
                                    <SelectTrigger className="w-full cursor-pointer">
                                        <SelectValue placeholder="Select a Company" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup className='cursor-pointer'>
                                            {companies.map((company) => (
                                                <SelectItem key={company._id} value={company._id}>
                                                    {company.name}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        )}
                    </div>
                    {loading ? (
                        <Button className="w-full my-4">
                            <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
                        </Button>
                    ) : (
                        <Button type="submit" className="w-full my-4">
                            Update Job
                        </Button>
                    )}
                </form>
            </div>
        </div>
    );
};

export default JobSetup;
