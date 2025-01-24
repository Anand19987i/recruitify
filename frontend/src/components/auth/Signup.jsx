import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

export const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: ""
  });
  const {loading,user} = useSelector(store=>store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();


  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] })
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true,
      })
      if (res.data.success) {
        dispatch(setLoading(false));
        navigate("/login");
        toast.success(res.data.message);

      } else {
        toast.error(res.data.message);
        dispatch(setLoading(false));

      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      toast.error("User already exist with this email.");
      dispatch(setLoading(false));
    }
  }
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [])

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto px-4">
        <form
          onSubmit={submitHandler}
          action=""
          className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 border border-gray-300 rounded-md p-6 my-10 shadow-md bg-white"
        >
          <h1 className="font-bold text-4xl text-gray-900  mb-5">Sign-up and apply for free</h1>

          {/* Full Name */}
          <div className="my-2">
            <Label className="font-semibold text-gray-700">
              Full name<span className="text-orange-500"> *</span>
            </Label>
            <Input type="text" name="fullname" value={input.fullname} onChange={changeEventHandler} placeholder="What is your name" />
          </div>

          {/* Email ID */}
          <div className="my-2">
            <Label className="font-semibold text-gray-700">
              Email ID<span className="text-orange-500"> *</span>
            </Label>
            <Input type="email" name="email" value={input.email} onChange={changeEventHandler} placeholder="Tell us your Email ID" />
          </div>

          {/* Mobile Number */}
          <div className="my-2">
            <Label className="font-semibold text-gray-700">
              Mobile number<span className="text-orange-500"> *</span>
            </Label>
            <div className="flex items-center border rounded-md">
              <span className="px-3 text-gray-500">+91</span>
              <Input
                type="tel"
                name="phoneNumber" value={input.phoneNumber} onChange={changeEventHandler}
                placeholder="Enter your mobile number"
                className="border-none outline-none flex-1"
              />
            </div>
          </div>

          {/* Password */}
          <div className="my-2">
            <Label className="font-semibold text-gray-700">
              Password<span className="text-orange-500"> *</span>
            </Label>
            <Input type="password" name="password" value={input.password} onChange={changeEventHandler} placeholder="(Minimum 6 characters)" />
          </div>

          {/* Role Selection */}
          <RadioGroup className="flex flex-wrap items-center my-5 gap-4 text-gray-800">
            <div className="flex items-center space-x-2">
              <Input type="radio" name="role" checked={input.role === 'student'} onChange={changeEventHandler} value="student" className="cursor-pointer" />
              <Label>Student</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Input type="radio" name="role" checked={input.role === 'recruiter'} onChange={changeEventHandler} value="recruiter" className="cursor-pointer" />
              <Label>Recruiter</Label>
            </div>
          </RadioGroup>

          {/* Profile Upload */}
          <div className="flex flex-wrap sm:flex-row items-center gap-5 my-5">
            <Label className="font-semibold text-gray-700">
              Profile<span className="text-orange-500">*</span>
            </Label>
            <Input type="file" accept="image/*" onChange={changeFileHandler} className="cursor-pointer" />
          </div>

          {/* Signup Button */}
          {
            loading ? <Button className="w-full my-4 bg-sky-700 hover:bg-blue-700"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button type="submit" className="w-full my-4 bg-sky-700 hover:bg-blue-700">Signup</Button>
          }
          <span className='text-gray-800 text-sm'>Already have an account? <Link to="/login" className='text-sky-700'>Login</Link></span>
        </form>
      </div>
    </div>
  );
};
