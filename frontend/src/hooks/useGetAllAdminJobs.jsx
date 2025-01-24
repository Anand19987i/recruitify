import { setAllAdminJobs } from '@/redux/jobSlice'
import { JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetAllAdminJobs = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(store => store.auth);

    useEffect(() => {
        const fetchAllAdminJobs = async () => {
            if (!user?.id) return; // Guard clause if user ID is missing
            try {
                const res = await axios.post(
                    `${JOB_API_END_POINT}/getadminjobs`, 
                    { userId: user.id }, 
                    { withCredentials: true }
                );
                if (res.data.success) {
                    dispatch(setAllAdminJobs(res.data.jobs));
                } else {
                    console.error("Failed to fetch admin jobs:", res.data.message);
                }
            } catch (error) {
                console.error("Error fetching jobs:", error.message || error);
            }
        };

        fetchAllAdminJobs();

        // Optional cleanup function
        return () => {
            // Cleanup or cancel any ongoing requests if needed
        };
    }, [user?.id, dispatch]); // Only run when user ID changes

};

export default useGetAllAdminJobs;
