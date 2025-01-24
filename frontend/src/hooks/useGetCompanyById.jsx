import { setSingleCompany } from '@/redux/companySlice';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const useGetCompanyById = (companyId) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSingleCompany = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleCompany(res.data.company));
                }
            } catch (error) {
                console.error(error);
                setError('Failed to fetch company data. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        if (companyId) {
            fetchSingleCompany();
        }
    }, [companyId, dispatch]);

    return { loading, error };
};

export default useGetCompanyById;
