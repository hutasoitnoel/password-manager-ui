import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { showToast } from '../../features/toast/toastSlice'
import { ENDPOINT, TOAST_ICON } from '../../config';
import { get, post } from '../../helper/axiosHelper';
import Credentials from '../Credentials';

const Dashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

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

    const onClickLogout = async () => {
        try {
            await post(ENDPOINT.LOGOUT, {})
            dispatch(showToast({ icon: TOAST_ICON.SUCCESS, text: 'Bye!' }))
            checkAuthentication()
        } catch (err) {
            dispatch(showToast({ icon: TOAST_ICON.ERROR, text: 'Logout failed' }))
        }
    }

    return <div className='container my-5'>
        <Row>
            <Col md={11}>
                <Tabs
                    defaultActiveKey="credentials"
                    id="uncontrolled-tab-example"
                    className="mb-3"
                    onSelect={(eventKey: string | null) => {
                        if (eventKey) setActiveTab(eventKey);
                    }}
                >
                    <Tab eventKey="credentials" title="Credentials" />
                    <Tab eventKey="investments" title="Investments" />
                    <Tab eventKey="debt" title="Debt" />
                    <Tab eventKey="credit" title="Credit" />
                </Tabs>
            </Col>
            <Col md={1}>
                <Button
                    variant='danger'
                    onClick={onClickLogout}
                >
                    Logout
                </Button>
            </Col>

        </Row>


        {activeTab === 'credentials' && <Credentials />}
    </div>
};

export default Dashboard;
