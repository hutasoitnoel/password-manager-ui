import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { BASE_URL } from '../../config';

const Dashboard = () => {
    const navigate = useNavigate();

    useEffect(() => {
        checkAuthentication()
    }, [])

    const checkAuthentication = async () => {
        try {
            const response = await Axios.get(`${BASE_URL}/check-auth`, { withCredentials: true })

            if (!response.data?.logged_in) {
                navigate("/login");
            }
        } catch (err: any) {
            console.log('failed auth check');
            console.log(err.response);
            navigate("/login");
        }
    }

    return <>
        Welcome to dashboard!
    </>
};

export default Dashboard;
