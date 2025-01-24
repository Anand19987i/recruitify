import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { JOB_API_END_POINT } from '@/utils/constant';
import { useDispatch } from 'react-redux';
import { setFilteredJobs } from '@/redux/jobSlice';

const filterData = [
  {
    filterType: 'Location',
    options: [
      'Delhi NCR',
      'Bangalore',
      'Hyderabad',
      'Pune',
      'Mumbai',
      'Chennai',
      'Kolkata',
      'Jaipur',
      'Ahmedabad'
    ]
  },
  {
    filterType: 'Job Type',
    options: ['Full-Time', 'Part-Time', 'Contract', 'Internship', 'Remote', 'Freelance']
  },
  {
    filterType: 'Experience Level',
    options: ['Fresher', '1-3 Years', '4-6 Years', '7-10 Years', '10+ Years']
  },
  {
    filterType: 'Skills',
    options: ['JavaScript', 'Python', 'Java', 'AWS', 'React', 'Node.js', 'Kubernetes', 'SQL', 'Docker']
  },
];

const FilterCard = () => {
  const [selectedFilters, setSelectedFilters] = useState({
    location: [],
    jobType: [],
    experienceLevel: [],
    skills: []
  });

  const dispatch = useDispatch();

  const handleCheckboxChange = (filterType, value) => {
    setSelectedFilters((prevFilters) => {
      const newFilters = { ...prevFilters };
      const currentFilter = newFilters[filterType];
      if (currentFilter.includes(value)) {
        newFilters[filterType] = currentFilter.filter((item) => item !== value);
      } else {
        newFilters[filterType] = [...currentFilter, value];
      }
      return newFilters;
    });
  };

  const fetchFilteredJobs = async (filters) => {
    try {
      const queryParams = new URLSearchParams();
      Object.keys(filters).forEach((filterType) => {
        const filterValues = filters[filterType];
        if (filterValues.length > 0) {
          queryParams.append(filterType, filterValues.join(','));
        }
      });

      const response = await axios.get(`${JOB_API_END_POINT}/filter-jobs?${queryParams.toString()}`);
      dispatch(setFilteredJobs(response.data));
    } catch (error) {
      console.error('Error fetching filtered jobs:', error);
    }
  };

  useEffect(() => {
    if (Object.values(selectedFilters).some((filter) => filter.length > 0)) {
      fetchFilteredJobs(selectedFilters);
    }
  }, [selectedFilters, dispatch]);

  return (
    <div className="w-full bg-white p-3 rounded-md ">
      <h1 className="font-bold text-lg">Filter Jobs</h1>
      <hr className="mt-3" />
      
      {filterData.map((data, index) => (
        <div key={index} className="mt-4">
          <h2 className="font-bold text-lg">{data.filterType}</h2>
          {data.options.map((item, idx) => {
            const itemId = `id${index}-${idx}`;
            return (
              <div key={idx} className="flex items-center space-x-2 my-2">
                <Checkbox
                  id={itemId}
                  checked={selectedFilters[data.filterType]?.includes(item)}
                  onChange={() => handleCheckboxChange(data.filterType, item)}
                />
                <Label htmlFor={itemId}>{item}</Label>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default FilterCard;
