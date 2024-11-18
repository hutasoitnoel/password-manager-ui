import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '../../components/ui/button'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import CredentialForm from './components/credentialForm';
import { CARD_MODE, ENDPOINT, INITIAL_CREDENTIAL_FORM, TOAST_ICON } from '../../config';
import { showToast } from '../../features/toast/toastSlice';
import CredentialCard from './components/credentialCard';
import { get, patch, axiosDelete, post } from '../../helper/axiosHelper';
import { onChangeInputText } from '../../helper/onChangeInputText';
import { Credential, CredentialFormType } from './types';
import { IoMdClose } from "react-icons/io";

import './styles.css'

const Credentials = () => {
    const dispatch = useDispatch()

    const [activeCardMode, setActiveCardMode] = useState("");
    const [activeCardIndex, setActiveCardIndex] = useState<number>(0);
    const [credentials, setCredentials] = useState<Credential[]>([]);
    const [form, setForm] = useState<CredentialFormType>(INITIAL_CREDENTIAL_FORM);
    const [logos, setLogos] = useState<{ [key: string]: string }>({});
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [formMode, setFormMode] = useState('EDIT')

    useEffect(() => {
        fetchCredentials()
    }, [])

    useEffect(() => {
        fetchLogos()
    }, [credentials])

    const fetchLogos = async () => {
        const promise = credentials.map(async ({ website_name }) => {
            const response = await get(ENDPOINT.WEBSITE_LOGO, { name: website_name })
            const { image } = response.data
            return { website_name, image }
        })

        const logoArr = await Promise.all(promise)

        let result: { [key: string]: string } = {}

        logoArr.forEach(({ website_name, image }) => {
            if (!result[website_name]) {
                result[website_name] = image
            }
        })

        setLogos(result)
    }

    const formOnChange = (e: React.ChangeEvent<HTMLInputElement>) => onChangeInputText(e, setForm)

    const onClickDelete = (index: number) => {
        setActiveCardMode(CARD_MODE.DELETE);
        setActiveCardIndex(index);
    }

    const onClickEdit = (index: number) => {
        setActiveCardIndex(index);
        setIsCreateModalOpen(true)
        setForm(credentials[index]);
        setFormMode('EDIT')
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
        setIsCreateModalOpen(false)
        fetchCredentials()
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
        dispatch(showToast({ icon: TOAST_ICON.ERROR, text }))
    };

    const showSuccessToast = (text: string) => {
        dispatch(showToast({ icon: TOAST_ICON.SUCCESS, text }))
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
        setFormMode('CREATE')
    }

    return <>
        <Button onClick={onOpenCreateCredentialModal}>
            Create credential
        </Button>
        <Row >
            {credentials.map((credential, index) => {
                const isActiveCard = index === activeCardIndex;

                return <Col md={3} className='my-3' key={index}>
                    <CredentialCard
                        logos={logos}
                        credential={credential}
                        isActiveCard={isActiveCard}
                        activeCardMode={activeCardMode}
                        index={index}
                        onClickDelete={onClickDelete}
                        onClickEdit={onClickEdit}
                        onClickCancel={onClickCancel}
                        onClickConfirmDelete={onClickConfirmDelete}
                    />
                </Col>
            })}
        </Row>
        <Modal show={isCreateModalOpen}>
            <div className='d-flex justify-end'>
                <IoMdClose className='text-2xl mr-2 mt-2 hover:cursor-pointer' onClick={onCancelCreateCredentialModal}/>
            </div>
            <div className='p-3'>
                <CredentialForm
                    form={form}
                    onChange={formOnChange}
                    onSubmitForm={() => formMode === 'CREATE' ? onConfirmCreate() : onClickConfirmEdit(activeCardIndex)}
                />
            </div>
        </Modal>
    </>
}

export default Credentials