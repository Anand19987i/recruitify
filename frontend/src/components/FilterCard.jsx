import React, { useState } from "react";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { useDispatch } from "react-redux";
import { setFilteredJobs } from "@/redux/jobSlice";

const filterData = [
  { 
    filterType: "Location", 
    options: ["Delhi NCR", "Bangalore", "Hyderabad", "Mumbai", "Pune", "Chennai", "Kolkata"] 
  },
  { 
    filterType: "Job Type", 
    options: ["Full-Time", "Part-Time", "Internship", "Remote", "Contract"] 
  },
  { 
    filterType: "Experience Level", 
    options: ["0-1 years", "1-2 years", "3-5 years", "5+ years"]  
  },
  { 
    filterType: "Skills", 
    options: [
      "React", "React Native", "Node.js", "Python", "Java", "C++", "Ruby", "Swift", "Kotlin", 
      "Go", "AWS", "Azure", "Docker", "Kubernetes", "Machine Learning", "Data Science", "Flutter"
    ] 
  }
];

const filterKeyMap = {
  Location: "location",
  "Job Type": "jobType",
  "Experience Level": "experienceLevel",
  Skills: "skills",
};

const FilterCard = ({ onFilter }) => {
  const dispatch = useDispatch();
  const [selectedFilters, setSelectedFilters] = useState({
    location: [],
    jobType: [],
    experienceLevel: [],
    skills: [],
  });

  const handleCheckboxChange = (filterType, value) => {
    const key = filterKeyMap[filterType];

    setSelectedFilters((prevFilters) => {
      const currentFilter = prevFilters[key];
      const updatedFilter = currentFilter.includes(value)
        ? currentFilter.filter((item) => item !== value) // Remove
        : [...currentFilter, value]; // Add

      return { ...prevFilters, [key]: updatedFilter };
    });
  };

  const applyFilters = async () => {
    const queryParams = new URLSearchParams();
    Object.keys(selectedFilters).forEach((key) => {
      if (selectedFilters[key].length > 0) {
        queryParams.append(key, selectedFilters[key].join(","));
      }
    });

    try {
      const response = await axios.get(
        `${JOB_API_END_POINT}/filter-jobs?${queryParams.toString()}`
      );
      onFilter(response.data);
      dispatch(setFilteredJobs(response.data.jobs));
    } catch (error) {
      console.error("Error fetching filtered jobs:", error);
    }
  };

  const clearFilters = () => {
    setSelectedFilters({
      location: [],
      jobType: [],
      experienceLevel: [],
      skills: [],
    });
    onFilter({ jobs: [] }); // Reset filtered jobs
  };

  return (
    <div className="bg-white p-5 shadow-md rounded-lg border border-gray-200">
      <h2 className="text-lg font-semibold mb-4">Filter Jobs</h2>

      {filterData.map(({ filterType, options }) => (
        <div key={filterType} className="mb-4">
          <h3 className="font-medium text-gray-700">{filterType}</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {options.map((option) => (
              <label key={option} className="flex items-center gap-2 text-sm text-gray-600">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 accent-blue-500"
                  checked={selectedFilters[filterKeyMap[filterType]].includes(option)}
                  onChange={() => handleCheckboxChange(filterType, option)}
                />
                {option}
              </label>
            ))}
          </div>
        </div>
      ))}

      <div className="flex gap-3 mt-4">
        <button
          onClick={applyFilters}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-all"
        >
          Apply Filters
        </button>
        <button
          onClick={clearFilters}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-all"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default FilterCard;
