import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    if (query.trim()) {
      dispatch(setSearchedQuery(query));
      navigate('/browse');
    } else {
      alert('Please enter a job title, keyword, or company.');
    }
  };

  return (
    <div className="text-center">
      <div className="flex flex-col gap-5 my-10">
        <h1 className="text-5xl font-semibold">
          Search, Apply & <br />
          Get Your <span className="text-sky-700">Dream Jobs</span>
        </h1>
        <div className="flex w-[40%] shadow-lg border border-gray-400 p-3 rounded-xl items-center gap-4 mx-auto hover:border-gray-700">
          <Search className="text-gray-500" />
          <input
            type="text"
            placeholder="Job title, keywords or company"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="outline-none border-gray-700 w-full p-2 text-gray-700"
          />
          <Button
            onClick={searchJobHandler}
            className="bg-sky-700 hover:bg-sky-800 text-white font-bold"
          >
            Find Jobs
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
