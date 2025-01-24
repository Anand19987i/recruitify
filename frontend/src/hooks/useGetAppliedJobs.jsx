import { setAllAppliedJobs } from "@/redux/jobSlice";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAppliedJobs = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(store => store.auth);

    useEffect(() => {
        const fetchAppliedJobs = async () => {
            try {
                const res = await axios.get(
                    `${APPLICATION_API_END_POINT}/get`, 
                    { 
                        params: { userId: user.id }, // Sending userId in query parameters
                        withCredentials: true
                    }
                );
                if (res.data.success) {
                    dispatch(setAllAppliedJobs(res.data.application));
                }
            } catch (error) {
                console.log(error);
            }
        };
        if (user) { // Ensure that user is defined before making the request
            fetchAppliedJobs();
        }
    }, [user, dispatch]);
};

export default useGetAppliedJobs;
