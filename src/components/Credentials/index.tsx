import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { CARD_MODE, ENDPOINT, INITIAL_EDIT_FORM, TOAST_ICON } from '../../config';
import { get, patch, axiosDelete, post } from '../../helper/axiosHelper';
import CommonToast from '../CommonToast';

import './styles.css'

interface Credential {
    ID: number,
    website_name: string,
    website_url: string,
    username: string,
    password: string
}

const Credentials = () => {
    const [activeCardMode, setActiveCardMode] = useState("");
    const [activeCardIndex, setActiveCardIndex] = useState<Number>();
    const [credentials, setCredentials] = useState<Credential[]>([]);
    const [editForm, setEditForm] = useState<Credential>(INITIAL_EDIT_FORM);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState({
        icon: '',
        text: ''
    });

    useEffect(() => {
        fetchCredentials()
    }, [])

    const onChangeInputText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
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

            showSuccessToast("Credential edited!")
        } catch (err) {
            console.log(err);
            showErrorToast("Error deleting credential")
        }

        setActiveCardMode("");
    }

    const onClickConfirmDelete = async (index: number) => {
        try {
            await axiosDelete(`passwords/${credentials[index].ID}`);
            await fetchCredentials();
            showSuccessToast("Credential deleted!")
        } catch (err) {
            console.log(err);
            showErrorToast("Error deleting credential")
        }

        setActiveCardMode("");
    }


    const fetchCredentials = async () => {
        try {
            const response = await get(ENDPOINT.PASSWORDS)

            setCredentials(response.data)
        } catch (err) {
            console.log(err)
        }
    }

    const showErrorToast = (text: string) => {
        setToastMessage({
            icon: TOAST_ICON.ERROR,
            text
        })
        setShowToast(true)
    };

    const showSuccessToast = (text: string) => {
        setToastMessage({
            icon: TOAST_ICON.SUCCESS,
            text
        })
        setShowToast(true)
    }

    const onConfirmCreate = async () => {
        try {
            await post('passwords', editForm)
            showSuccessToast("New credential created!")
        } catch (err) {
            console.log(err);
            showErrorToast("Error creating credential")
        }

        setIsCreateModalOpen(false)
        fetchCredentials()
    }

    const onCancelCreateCredentialModal = () => {
        setIsCreateModalOpen(false)
        setEditForm(INITIAL_EDIT_FORM)
    }

    const onOpenCreateCredentialModal = () => {
        setIsCreateModalOpen(true)
        setEditForm(INITIAL_EDIT_FORM)
    }


    return <>
        <Button onClick={onOpenCreateCredentialModal}>
            Create credential
        </Button>
        <Row >
            {credentials.map((credential, index) => {
                const isActiveCard = index === activeCardIndex;

                return <Col className='col-3 my-3' key={index}>
                    <Card className='card-style'>
                        <Card.Body>
                            {
                                isActiveCard && activeCardMode === CARD_MODE.EDIT ?
                                    <>
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
                                    </>
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
        <CommonToast 
            show={showToast}
            onClose={() => setShowToast(false)}
            icon={toastMessage.icon}
            text={toastMessage.text}
        />
        <Modal
            show={isCreateModalOpen}>
            <div className='p-3'>
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
                <div className='d-flex justify-content-between'>
                    <Button variant='info' onClick={onCancelCreateCredentialModal}>Cancel</Button>
                    <Button variant='primary' onClick={onConfirmCreate}>Confirm</Button>
                </div>
            </div>
        </Modal>
    </>
}

export default Credentials