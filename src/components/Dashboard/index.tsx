import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { CARD_MODE, ENDPOINT } from '../../config';
import { get, patch, axiosDelete } from '../../helper/axiosHelper';
import { Credential } from './types';

const Dashboard = () => {
    const navigate = useNavigate();

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [credentials, setCredentials] = useState<Credential[]>([]);
    const [editForm, setEditForm] = useState<Credential>({
        ID: 0,
        website_name: "",
        website_url: "",
        username: "",
        password: ""
    });
    const [activeCardMode, setActiveCardMode] = useState("");
    const [activeCardIndex, setActiveCardIndex] = useState<Number>();

    useEffect(() => {
        checkAuthentication()
    }, [])

    useEffect(() => {
        if (isAuthenticated) {
            fetchCredentials()
        }
    }, [isAuthenticated])

    const onChangeInputText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const checkAuthentication = async () => {
        try {
            const response = await get(ENDPOINT.CHECK_AUTHORIZATION);

            if (!response.data?.logged_in) {
                navigate("/login");
            } else {
                setIsAuthenticated(true)
            }
        } catch (err: any) {
            navigate("/login");
        }
    }

    const fetchCredentials = async () => {
        try {
            const response = await get(ENDPOINT.PASSWORDS)

            setCredentials(response.data)
        } catch (err) {
            console.log(err)
        }
    }

    const onClickDelete = (index: number) => {
        setActiveCardMode(CARD_MODE.DELETE);
        setActiveCardIndex(index);
    }

    const onClickEdit = (index: number) => {
        setActiveCardMode(CARD_MODE.EDIT);
        setActiveCardIndex(index);
        setEditForm(credentials[index]);
    }

    const onClickCancel = () => {
        setActiveCardMode("");
    }

    const onClickConfirmEdit = async (index: number) => {
        try {
            const response = await patch(`passwords/${credentials[index].ID}`, editForm);

            credentials[index] = response.data;
        } catch (err) {
            console.log(err);
        }

        setActiveCardMode("");
    }

    const onClickConfirmDelete = async (index: number) => {
        try {
            await axiosDelete(`passwords/${credentials[index].ID}`);
            await fetchCredentials();
        } catch (err) {
            console.log(err);
        }

        setActiveCardMode("");
    }

    return <div className='container my-5'>
        <Row >
            {credentials.map((credential, index) => {
                const isActiveCard = index === activeCardIndex;

                return <Col className='col-3 my-3' key={index}>
                    <Card className='card-style'>
                        <Card.Body>
                            {
                                isActiveCard && activeCardMode === CARD_MODE.EDIT ?
                                    <Form>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Website name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={editForm.website_name}
                                                onChange={onChangeInputText}
                                                name='website_name'
                                            />
                                            <Form.Label>Website URL</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={editForm.website_url}
                                                onChange={onChangeInputText}
                                                name='website_url'
                                            />
                                            <Form.Label>Username</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={editForm.username}
                                                onChange={onChangeInputText}
                                                name='username'
                                            />
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={editForm.password}
                                                onChange={onChangeInputText}
                                                name='password'
                                            />
                                        </Form.Group>
                                    </Form>
                                    : <>
                                        <Card.Text>Website name</Card.Text>
                                        <Card.Text>{credential.website_name}</Card.Text>
                                        <Card.Text>Website URL</Card.Text>
                                        <Card.Text>{credential.website_url}</Card.Text>
                                        <Card.Text>Username</Card.Text>
                                        <Card.Text>{credential.username}</Card.Text>
                                        <Card.Text>Password</Card.Text>
                                        <Card.Text>{credential.password}</Card.Text>
                                    </>
                            }
                            {
                                isActiveCard && activeCardMode === CARD_MODE.EDIT ?
                                    <div className='d-flex justify-content-between'>
                                        <Button onClick={onClickCancel} variant='danger'>Cancel</Button>
                                        <Button onClick={() => onClickConfirmEdit(index)} variant='info'>Confirm</Button>
                                    </div>
                                    :
                                    isActiveCard && activeCardMode === CARD_MODE.DELETE ?
                                        <div className='d-flex justify-content-between'>
                                            <Button onClick={onClickCancel} variant='info'>Cancel</Button>
                                            <Button onClick={() => onClickConfirmDelete(index)} variant='danger'>Delete</Button>
                                        </div>
                                        :
                                        <div className='d-flex justify-content-between'>
                                            <Button onClick={() => onClickDelete(index)} variant='danger'>Delete</Button>
                                            <Button onClick={() => onClickEdit(index)} variant='info'>Edit</Button>
                                        </div>
                            }
                        </Card.Body>
                    </Card>
                </Col>
            })}
        </Row>
    </div>
};

export default Dashboard;
