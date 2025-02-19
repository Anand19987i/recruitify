import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from '../ui/button';
import { LogOut, User2, Menu } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { setUser } from '@/redux/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    };

    const renderNavLinks = () => {
        if (user) {
            if (user.role === 'recruiter') {
                return (
                    <>
                        <li><Link to="/admin/companies" className="hover:text-sky-700">Companies</Link></li>
                        <li><Link to="/admin/jobs" className="hover:text-sky-700">Jobs</Link></li>
                    </>
                );
            }
            if (user.role === 'student') {
                return (
                    <>
                        <li><Link to="/" className="hover:text-sky-700">Home</Link></li>
                        <li><Link to="/jobs" className="hover:text-sky-700">Jobs</Link></li>
                        <li><Link to="/browse" className="hover:text-sky-700">Browse</Link></li>
                    </>
                );
            }
        } else {
            return (
                <>
                    <li className='px-4 py-2 rounded bg-sky-800 text-white hover:bg-sky-900'><Link to="/login">Login</Link></li>
                    <li className='px-4 py-2 rounded border border-gray-300 text-gray-800 hover:bg-gray-200'><Link to="/signup">Signup</Link></li>
                </>
            );
        }
    };

    return (
        <div className='bg-white shadow-md'>
            <div className="flex items-center justify-between px-4 md:px-8 lg:px-16 mx-auto max-w-7xl h-16">
                {/* Logo */}
                <Link to={"/"}>
                    <h1 className='text-xl md:text-2xl font-bold text-sky-700'>Recruitify</h1>
                </Link>
                {/* Hamburger Icon for Small Devices */}
                <button
                    className="block md:hidden"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    <Menu className="w-6 h-6 text-gray-700" />
                </button>
                {/* Navigation Links */}
                <div className={`hidden md:flex items-center gap-4 md:gap-12`}>
                    <ul className="flex font-medium items-center gap-5 text-gray-700">
                        {renderNavLinks()}
                    </ul>
                    {user && (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Avatar className='cursor-pointer'>
                                    <AvatarImage src={user?.profilePhoto} alt={user?.fullname} />
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className='w-64 md:w-80'>
                                <div className="flex gap-4 items-center">
                                    <Avatar className='cursor-pointer'>
                                        <AvatarImage src={user?.profilePhoto} alt={user?.fullname} />
                                    </Avatar>
                                    <div>
                                        <h4 className='font-medium'>{user?.fullname}</h4>
                                        <p className='text-sm text-gray-600'>{user?.bio}</p>
                                    </div>
                                </div>
                                <div className='flex flex-col text-gray-600 my-3'>
                                    {user.role === "student" && (
                                        <div className="flex w-fit items-center gap-2 cursor-pointer">
                                            <User2 />
                                            <Link to={`/profile/${user.id}`} className='text-gray-900 text-sm mx-3 font-semibold'> View Profile</Link>
                                        </div>
                                    )}
                                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                                        <LogOut />
                                        <Button variant='link' onClick={logoutHandler}>Logout</Button>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
                </div>
            </div>
            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="absolute w-full md:hidden px-4 py-2 bg-white z-50">
                    <ul className="flex flex-col text-center gap-2 text-gray-700">
                        {renderNavLinks()}
                        {user && (
                            <li>
                                <button onClick={logoutHandler} className="hover:text-sky-700">Logout</button>
                            </li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Navbar;
