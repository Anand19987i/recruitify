import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const [query, setQuery] = useState('');
  const [isSmallScreen, setIsSmallScreen] = useState(false);
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

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 640); // You can adjust the breakpoint as per your needs
    };
    
    handleResize(); // Set initial state based on the window size
    window.addEventListener('resize', handleResize); // Update state on window resize

    return () => {
      window.removeEventListener('resize', handleResize); // Cleanup on unmount
    };
  }, []);

  return (
    <div className="text-center py-5 mt-8 px-4 sm:px-8 md:px-12">
      <div className="flex flex-col gap-5 my-5">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight">
          Search, Apply & <br />
          Get Your <span className="text-sky-700">Dream Jobs</span>
        </h1>

        <div className="flex flex-row sm:flex-row items-center justify-center gap-4 sm:w-[70%] md:w-[50%] lg:w-[40%] mx-auto shadow-lg border border-gray-400 p-3 rounded-xl hover:border-gray-700">
          <Search className="text-gray-500 hidden sm:block" />
          <input
            type="text"
            placeholder="Job title, keywords or company"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="outline-none border-gray-700 w-full p-2 text-gray-700 rounded-md"
          />
          {isSmallScreen ? (
            <button onClick={searchJobHandler} className="p-2 py-3 rounded-md bg-sky-700 text-white hover:bg-sky-800">
              <Search />
            </button>
          ) : (
            <Button
              onClick={searchJobHandler}
              className="bg-sky-700 hover:bg-sky-800 text-white font-bold w-full sm:w-auto"
            >
              Find Jobs
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
