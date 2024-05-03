import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { ENDPOINT } from '../../config';
import { get } from '../../helper/axiosHelper';
import { Credential } from './types';

const Dashboard = () => {
    const navigate = useNavigate();

    const [cardMode, setCardMode] = useState(""); // VIEW, EDIT, DELETE
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [credentials, setCredentials] = useState<Credential[]>([]);
    const [editModeIndex, setEditModeIndex] = useState<Number>();
    const [editForm, setEditForm] = useState<Credential>({
        website_name: "",
        website_url: "",
        username: "",
        password: ""
    });

    useEffect(() => {
        checkAuthentication()
    }, [])

    useEffect(() => {
        if (isAuthenticated) {
            fetchCredentials()
        }
    }, [isAuthenticated])

    const onChangeInputText = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
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
            console.log('failed auth check');
            console.log(err.response);
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

    const onClickDelete = () => {

    }

    const onClickEdit = (index: number) => {
        setEditModeIndex(index)
    }

    return <div className='container my-5'>
        <Row >
            {credentials.map((credential, index) => {
                const isEditMode = index === editModeIndex;

                return <Col className='col-3 my-3' key={index}>
                    <Card className='card-style'>
                        <Card.Body>
                            {
                                isEditMode ?
                                    <Form>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Website name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={credential.website_name}
                                                onChange={onChangeInputText}
                                                name='website_name'
                                            />
                                            <Form.Label>Website URL</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={credential.website_url}
                                                onChange={onChangeInputText}
                                                name='website_url'
                                            />
                                            <Form.Label>Username</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={credential.username}
                                                onChange={onChangeInputText}
                                                name='username'
                                            />
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={credential.password}
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
                            <div className='d-flex justify-content-between'>
                                <Button onClick={onClickDelete} variant='danger'>Delete</Button>
                                <Button onClick={() => onClickEdit(index)} variant='info'>Edit</Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            })}
        </Row>
    </div>
};

export default Dashboard;
