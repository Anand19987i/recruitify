import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import Job from "./Job";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import FilterCard from "../components/FilterCard";
import { setFilteredJobs } from "@/redux/jobSlice";
import { JOB_API_END_POINT } from "@/utils/constant";

const Jobs = () => {
  const dispatch = useDispatch();
  const [allJobs, setAllJobs] = useState([]); // Store full job list
  const [filteredJobs, setFilteredJobsList] = useState([]); // Store filtered jobs
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  // Fetch all jobs when component mounts
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(`${JOB_API_END_POINT}/get`); // Update with actual API
        const data = await response.json();
        
        if (data.success && Array.isArray(data.jobs)) {
          setAllJobs(data.jobs); // Store all jobs
          setFilteredJobsList(data.jobs); // Initially, show all jobs
          dispatch(setFilteredJobs(data.jobs)); // Update Redux store
        } else {
          console.error("Invalid job data format:", data);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, [dispatch]);

  // Handle filter updates
  const handleFilterUpdate = (data) => {
    if (data && Array.isArray(data.jobs)) {
      setFilteredJobsList(data.jobs);
      dispatch(setFilteredJobs(data.jobs));
    } else {
      console.error("Invalid filtered jobs data:", data);
      setFilteredJobsList(allJobs); // Reset to all jobs if filtering fails
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5 px-4">
        <div className="flex flex-col lg:flex-row gap-5">
          {/* Left Sidebar for Filters */}
          <div className="w-full lg:w-[25%] lg:block hidden">
            <FilterCard onFilter={handleFilterUpdate} />
          </div>

          {/* Main Content Area */}
          <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
            <div className="lg:hidden p-2 z-50">
              <button
                onClick={() => setIsFilterVisible(!isFilterVisible)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-all"
              >
                {isFilterVisible ? "Hide Filters" : "Show Filters"}
              </button>
            </div>

            {filteredJobs.length === 0 ? (
              <div className="text-center mt-10 text-gray-500">
                <span>No jobs found. Try clearing your filters or searching for a different query.</span>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filteredJobs.map((job) => (
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    key={job._id}
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Filter Panel for Small Screens */}
      {isFilterVisible && (
        <div className="fixed top-0 right-0 h-full w-2/3 lg:w-[25%] bg-white z-50 shadow-lg transition-transform transform lg:hidden">
          <div className="p-5">
            <button
              onClick={() => setIsFilterVisible(false)}
              className="text-gray-600 hover:text-gray-900 absolute top-5 right-5 text-2xl"
            >
              &times;
            </button>
            <FilterCard onFilter={handleFilterUpdate} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Jobs;
