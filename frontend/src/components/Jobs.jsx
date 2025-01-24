import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import FilterCard from '../components/FilterCard';

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);
  const [isFilterVisible, setIsFilterVisible] = useState(false); // State for showing/hiding filter panel

  useEffect(() => {
    // Perform filtering based on searchedQuery
    if (searchedQuery) {
      const filteredJobs = allJobs.filter((job) => {
        const query = searchedQuery.toLowerCase();
        return (
          job.title.toLowerCase().includes(query) ||
          job.description.toLowerCase().includes(query) ||
          job.location.toLowerCase().includes(query) ||
          job.jobType.toLowerCase().includes(query) ||
          job.experienceLevel.toLowerCase().includes(query) ||
          job.salary.toLowerCase().includes(query)
        );
      });
      setFilterJobs(filteredJobs);
    } else {
      // Reset to show all jobs if no query is entered
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchedQuery]);

  // Toggle filter visibility
  const toggleFilterPanel = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5 px-4">
        <div className="flex flex-col lg:flex-row gap-5">
          {/* Left Sidebar for Filters (Visible only on large screens) */}
          <div className="w-full lg:w-[25%] lg:block hidden">
            <FilterCard />
          </div>

          {/* Main Content Area */}
          <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
            {/* Show Filters Button (Visible only on small devices) */}
            <div className="lg:hidden p-2 z-50">
              <button
                onClick={toggleFilterPanel}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-all"
              >
                Show Filters
              </button>
            </div>

            {filterJobs.length <= 0 ? (
              <div className="text-center mt-10 text-gray-500">
                <span>No jobs found. Try clearing your filters or searching for a different query.</span>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ">
                {filterJobs.map((job) => (
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    key={job?._id}
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Filter Panel (Sliding from the Right for Small Screens Only) */}
      <div
        className={`fixed top-0 right-0 h-full lg:w-[25%] w-1/2 bg-white z-50 shadow-lg transition-all duration-500 transform ${
          isFilterVisible ? 'translate-x-0' : 'translate-x-full'
        } lg:translate-x-0 lg:hidden`}  // Ensure it only slides from the right on small screens
      >
        <div className="p-5">
          <button
            onClick={toggleFilterPanel}
            className="text-gray-600 hover:text-gray-900 absolute top-5 right-5 text-2xl"
          >
            &times; {/* Close icon */}
          </button>
          <FilterCard />
        </div>
      </div>
    </div>
  );
};

export default Jobs;
