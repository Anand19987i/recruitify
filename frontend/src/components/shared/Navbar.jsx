import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Avatar, AvatarImage } from "../ui/avatar"
import { Button, buttonVariants } from '../ui/button'
import { LogOut, User2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { setUser } from '@/redux/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            dispatch(setUser(null));
            navigate("/");
            toast.success(res.data.message);
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }
    return ( 
        <div className='bg-white shadow-md'>
            <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
                <div>
                    <h1 className='text-2xl font-bold text-sky-700'>Recruitify</h1>
                </div>
                <div className='flex items-center gap-12'>
                    <ul className="flex font-medium icons-center gap-5 text-grey-100">
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <li><Link to="/admin/companies">Companies</Link></li>
                                    <li><Link to="/admin/jobs">Jobs</Link></li>
                                </>
                            ) :
                                (
                                    <>
                                        <li><Link to="/">Home</Link></li>
                                        <li><Link to="/jobs">Jobs</Link></li>
                                        <li><Link to="/browse">Browse</Link></li>
                                    </>
                                )
                        }

                    </ul>
                    {
                        !user ? (
                            <div className='flex items-center gap-3'>
                                <Link to="/login"><Button className='bg-sky-700 text-white hover:bg-sky-900'>Login</Button></Link>
                                <Link to="/signup"><Button variant='outline' className='text-sky-700 hover:text-blue-700'>Signup</Button></Link>
                            </div>
                        ) : <Popover>
                            <PopoverTrigger asChild>
                                <Avatar className='cursor-pointer'>
                                    <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className='w-80'>
                                <div className="flex gap-4 items-center">
                                    <Avatar className='cursor-pointer'>
                                        <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                    </Avatar>
                                    <div>
                                        <h4 className='font-medium'>{user?.fullname}</h4>
                                        <p className='text-sm text-muted-foreground' >{user?.profile?.bio}</p>
                                    </div>
                                </div>
                                <div className='flex flex-col text-gray-600 my-3'>
                                    {
                                        user && user.role === "recruiter" ? (
                                            <>
                                                <div className="flex w-fit items-center gap-2 cursor-pointer">
                                                    <LogOut />
                                                    <Button variant='link' onClick={logoutHandler}>Logout</Button>
                                                </div>
                                            </>
                                        ) :
                                            (
                                                <>
                                                    <div className="flex w-fit items-center gap-2 cursor-pointer disabled:outline-none'">
                                                        <User2 />
                                                        <Button variant='link'><Link to="/profile">View Profile</Link></Button>
                                                    </div>
                                                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                                                        <LogOut />
                                                        <Button variant='link' onClick={logoutHandler}>Logout</Button>
                                                    </div>
                                                </>
                                            )

                                    }
                                </div>
                            </PopoverContent>
                        </Popover>
                    }

                </div>
            </div>
        </div>
    )
}
export default Navbar