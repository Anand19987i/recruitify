import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';

export const Login = () => {
  const [input, setInput] = useState({ email: '', password: '', role: '' });
  const { loading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const validateInputs = () => {
    const { email, password, role } = input;
    if (!email || !password || !role) {
      toast.error('Please fill in all fields.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    try {
      dispatch(setLoading(true));
      const response = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });

      if (response.data.success) {
        dispatch(setUser(response.data.user));
        toast.success(response.data.message);
        navigate('/');
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'An unexpected error occurred.';
      toast.error(errorMessage);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10 shadow-xl"
        >
          <h1 className="font-bold text-xl mb-5">Login</h1>

          <div className="my-2">
            <Label className="font-semibold text-gray-700">
              Email ID<span className="text-orange-500"> *</span>
            </Label>
            <Input
              type="email"
              name="email"
              value={input.email}
              onChange={handleChange}
              placeholder="Enter your active email"
            />
          </div>

          <div className="my-2">
            <Label className="font-semibold text-gray-700">
              Password<span className="text-orange-500"> *</span>
            </Label>
            <Input
              type="password"
              name="password"
              value={input.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
          </div>

          <div className="my-5">
            <RadioGroup className="flex items-center gap-4 text-gray-800">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === 'student'}
                  onChange={handleChange}
                  className="cursor-pointer"
                />
                <Label>Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === 'recruiter'}
                  onChange={handleChange}
                  className="cursor-pointer"
                />
                <Label>Recruiter</Label>
              </div>
            </RadioGroup>
          </div>

          <Button
            type="submit"
            className="w-full my-4 bg-sky-700 hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              'Login'
            )}
          </Button>

          <span className="text-sm">
            Don't have an account?{' '}
            <Link to="/signup" className="text-sky-700">
              Signup
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};
