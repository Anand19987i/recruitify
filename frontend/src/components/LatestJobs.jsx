import React from 'react';
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';

const LatestJobs = () => {
  const { allJobs } = useSelector(store => store.job);

  return (
    <div className='max-w-7xl mx-auto my-1 p-4 md:my-20'>
      <h1 className='text-3xl md:text-5xl font-semibold'>
        <span className='text-sky-700'>Latest & Top</span> Job Openings
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-5">
        {
          allJobs.length <= 0 ? <span>No Job Available</span> : allJobs.slice(0, 6).map((job) => <LatestJobCards key={job._id} job={job} />)
        }
      </div>
    </div>
  );
};

export default LatestJobs;
