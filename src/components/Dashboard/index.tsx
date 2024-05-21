import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { showToast } from '../../features/toast/toastSlice'
import { ENDPOINT, TOAST_ICON } from '../../config';
import { get, post } from '../../helper/axiosHelper';
import Credentials from '../Credentials';
import Savings from '../Savings';

import credentialIcon from '../../icons/credential.png';
import savingsIcon from '../../icons/savings.png'

const Dashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

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
                <Tabs>
                    <TabList>
                        <Tab>
                            <div className='d-flex align-items-center'>
                                <Image
                                    src={credentialIcon}
                                    height={15}
                                />
                                <p className='m-0'>
                                    Credentials
                                </p>
                            </div>
                        </Tab>
                        <Tab>
                            <div className='d-flex align-items-center'>
                                <Image
                                    src={savingsIcon}
                                    height={15}
                                />
                                <p className='m-0'>
                                    Savings
                                </p>
                            </div>
                        </Tab>
                    </TabList>

                    <TabPanel>
                        <Credentials />
                    </TabPanel>
                    <TabPanel>
                        <Savings />
                    </TabPanel>
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
    </div>
};

export default Dashboard;
