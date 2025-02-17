import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { useSelector } from 'react-redux';
import { Button } from './ui/button';
import { Contact, Mail, Pen } from 'lucide-react';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import UpdateProfileDialog from './UpdateProfileDialog';
import AppliedJobsTable from './AppliedJobsTable';
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs';

const isResume = true;

const Profile = () => {
    useGetAppliedJobs();

    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);
    console.log(user.id);
    return (
        <div>
            <Navbar />
            <div className="max-w-7xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
                <div className="flex justify-between">
                    <div className="flex items-center gap-4">
                        <Avatar className='h-15 w-24'>
                            <AvatarImage src={user.profilePhoto} alt='profileImage' className='rounded-md' />
                        </Avatar>
                        <div>
                            <h1 className='font-bold'>{user.fullname}</h1>
                            <p>{user.bio}</p>
                        </div>
                    </div>
                    <Button onClick={() => setOpen(true)} variant='outline' className='text-right'><Pen /></Button>
                </div>
                <div className="my-5">
                    <div className="flex items-center gap-3 my-2">
                        <Mail />
                        <span>{user.email}</span>
                    </div>
                    <div className="flex items-center gap-3 my-2">
                        <Contact />
                        <span>{user.phoneNumber}</span>
                    </div>
                </div>
                <div className="my-5">
                    <h1>Skills</h1>
                    <div className="flex items-center gap-1">
                        {
                            user?.skills.length !== 0 ? user?.skills.map((item, index) => <Badge key={index}>{item}</Badge>):<span>NA</span>
                        }
                    </div>
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label className='text-md font-bold'>Resume</Label>
                    {
                        isResume ? <a target='_blank' href={user?.resume} className='text-blue-500 w-full hover:underline cursor-pointer'>{user?.resumeOriginalName}</a> : <span>NA</span>
                    }
                </div>
            </div>
            <div className="max-w-7xl mx-auto bg-white rounded-xl px-2 py-4">
                <h1 className="font-bold text-lg my-5">Applied Jobs</h1>
                <AppliedJobsTable/>
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen}/>
        </div>
    )
}

export default Profile
