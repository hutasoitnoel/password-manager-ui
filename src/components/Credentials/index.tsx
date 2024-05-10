import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import CredentialForm from './components/credentialForm';
import { CARD_MODE, ENDPOINT, FIELD_LABEL_MAPPER, INITIAL_CREDENTIAL_FORM, TOAST_ICON, credentialFormFields } from '../../config';
import { get, patch, axiosDelete, post } from '../../helper/axiosHelper';
import CommonToast from '../CommonToast';
import { Credential, CredentialFormType } from './types';

import './styles.css'

const Credentials = () => {
    const [activeCardMode, setActiveCardMode] = useState("");
    const [activeCardIndex, setActiveCardIndex] = useState<Number>();
    const [credentials, setCredentials] = useState<Credential[]>([]);
    const [form, setForm] = useState<CredentialFormType>(INITIAL_CREDENTIAL_FORM);
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
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const onClickDelete = (index: number) => {
        setActiveCardMode(CARD_MODE.DELETE);
        setActiveCardIndex(index);
    }

    const onClickEdit = (index: number) => {
        setActiveCardMode(CARD_MODE.EDIT);
        setActiveCardIndex(index);
        setForm(credentials[index]);
    }

    const onClickCancel = () => {
        setActiveCardMode("");
    }

    const onClickConfirmEdit = async (index: number) => {
        try {
            const response = await patch(`passwords/${credentials[index].ID}`, form);

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
            await post('passwords', form)
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
        setForm(INITIAL_CREDENTIAL_FORM)
    }

    const onOpenCreateCredentialModal = () => {
        setIsCreateModalOpen(true)
        setForm(INITIAL_CREDENTIAL_FORM)
    }

    const displayCredential = (credential: Credential) => {
        return credentialFormFields.map(field => {
            return <>
            <Card.Text>{FIELD_LABEL_MAPPER[field]}</Card.Text>
            <Card.Text>{credential[field]}</Card.Text>
            </>
        })
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
                                    <CredentialForm
                                        form={form}
                                        onChange={onChangeInputText}
                                    />
                                    : displayCredential(credential)
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
                <CredentialForm
                    form={form}
                    onChange={onChangeInputText}
                />
                <div className='d-flex justify-content-between'>
                    <Button variant='info' onClick={onCancelCreateCredentialModal}>Cancel</Button>
                    <Button variant='primary' onClick={onConfirmCreate}>Confirm</Button>
                </div>
            </div>
        </Modal>
    </>
}

export default Credentials