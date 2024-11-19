import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button } from '../../components/ui/button';
import { Label } from '../../components/ui/label';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { showToast } from '../../features/toast/toastSlice'
import { ENDPOINT, TOAST_ICON } from '../../config';
import { get, post } from '../../helper/axiosHelper';
import Credentials from '../Credentials';
import Savings from '../Savings';
import Identification from '../Identification';
import { FaUserLock } from "react-icons/fa";
import { FaAddressCard } from "react-icons/fa";
import { MdSavings } from "react-icons/md";

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
                                <FaUserLock className='mr-2' />
                                <Label className='text-lg hover:cursor-pointer'>
                                    Credentials
                                </Label>
                            </div>
                        </Tab>
                        <Tab>
                            <div className='d-flex align-items-center'>
                                <FaAddressCard className='mr-2' />
                                <Label className='text-lg hover:cursor-pointer'>
                                    Identifications
                                </Label>
                            </div>
                        </Tab>
                        <Tab>
                            <div className='d-flex align-items-center'>
                                <MdSavings className='mr-2' />
                                <Label className='text-lg hover:cursor-pointer'>
                                    Savings
                                </Label>
                            </div>
                        </Tab>
                    </TabList>

                    <TabPanel>
                        <Credentials />
                    </TabPanel>
                    <TabPanel>
                        <Identification />
                    </TabPanel>
                    <TabPanel>
                        <Savings />
                    </TabPanel>
                </Tabs>
            </Col>
            <Col md={1}>
                <Button
                    variant='destructive'
                    onClick={onClickLogout}
                >
                    Logout
                </Button>
            </Col>
        </Row>
    </div>
};

export default Dashboard;
