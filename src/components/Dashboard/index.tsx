import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { ENDPOINT } from '../../config';
import { get } from '../../helper/axiosHelper';
import Credentials from '../Credentials';

const Dashboard = () => {
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState("credentials");

    useEffect(() => {
        checkAuthentication()
    }, [])

    const checkAuthentication = async () => {
        try {
            const response = await get(ENDPOINT.CHECK_AUTHORIZATION);

            if (!response.data?.logged_in) {
                navigate("/login");
            }
        } catch (err: any) {
            navigate("/login");
        }
    }

    return <div className='container my-5'>
        <Tabs
            defaultActiveKey="credentials"
            id="uncontrolled-tab-example"
            className="mb-3"
            onSelect={(eventKey: string | null) => {
                if (eventKey) setActiveTab(eventKey);
            }}
        >
            <Tab eventKey="credentials" title="Credentials" />
            <Tab eventKey="finances" title="Finances" />
        </Tabs>
        {activeTab === 'credentials' && <Credentials />}
    </div>
};

export default Dashboard;
