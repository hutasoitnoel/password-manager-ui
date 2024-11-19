import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import IdentificationCard from './components/identificationCard'
import { Button } from '../../components/ui/button'
import { axiosDelete, get, patch, performOCR, post } from '../../helper/axiosHelper';
import React, { useEffect, useState } from 'react';
import IdentificationForm from './components/identificationForm';
import { IoMdClose } from 'react-icons/io';
import { ENDPOINT, INITIAL_KTP_FORM, TOAST_ICON } from '../../config';
import { onChangeInputText } from '../../helper/onChangeInputText';
import { useDispatch } from 'react-redux';
import { showToast } from '../../features/toast/toastSlice';
import IdentificationDetails from './components/identificationDetails'

const FileUpload = () => {
    const dispatch = useDispatch()

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [identifications, setIdentifications] = useState<any>([]);
    const [status, setStatus] = useState<string>('');
    // const [processedImageUrl, setProcessedImageUrl] = useState<string | null>(null);
    const [ocrData, setOcrData] = useState({})
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [activeCardMode, setActiveCardMode] = useState("")
    const [form, setForm] = useState(INITIAL_KTP_FORM);
    const [formMode, setFormMode] = useState('EDIT')
    const [activeCardIndex, setActiveCardIndex] = useState<number>(0);

    useEffect(() => {
        fetchIdentifications()
    }, [])


    const fetchIdentifications = async () => {
        try {
            const response = await get(ENDPOINT.IDENTIFICATIONS)

            setIdentifications(response.data)
        } catch (err) {
            console.log(err)
        }
    }

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedFile(event.target.files[0]);

            if (!selectedFile) {
                setStatus('Please select a file to upload.');
                return;
            }

            console.log('selectedFile');
            console.log(selectedFile)

            const formData = new FormData();
            formData.append('image', selectedFile);

            try {
                setStatus('Uploading...');
                const response: any = await performOCR(formData);

                console.log(response)

                setStatus('File uploaded and processed successfully.');
                setOcrData(response); // Save processed image URL
            } catch (error: any) {
                setStatus(`Error: ${error.message}`);
            }
        }
    };

    const onCloseIdentificationModal = () => {
        setIsCreateModalOpen(false)
    }

    const onCloseDetailsModal = () => {
        setIsDetailsModalOpen(false)
    }

    const onOpenCreateIdentificationModal = () => {
        setIsCreateModalOpen(true)
    }

    const showErrorToast = (text: string) => {
        dispatch(showToast({ icon: TOAST_ICON.ERROR, text }))
    };

    const showSuccessToast = (text: string) => {
        dispatch(showToast({ icon: TOAST_ICON.SUCCESS, text }))
    }

    // bulk change
    const onChangeForm = (data: any) => {
        setForm((prev: any) => ({ ...prev, data }))
    }

    // single field change
    const formOnChange = (e: React.ChangeEvent<HTMLInputElement>) => onChangeInputText(e, setForm)

    const onConfirmCreate = async () => {
        try {
            await post('passwords', form)
            showSuccessToast("New credential created!")
        } catch (err) {
            console.log(err);
            showErrorToast("Error creating credential")
        }

        setIsCreateModalOpen(false)
        fetchIdentifications()
    }

    const onClickConfirmEdit = async (index: number) => {
        try {
            const response = await patch(`identifications/${identifications[index].ID}`, form);

            identifications[index] = response.data;

            showSuccessToast("Credential edited!")
        } catch (err) {
            console.log(err);
            showErrorToast("Error deleting credential")
        }

        setActiveCardMode("");
        setIsCreateModalOpen(false)
        fetchIdentifications()
    }

    const onClickDelete = (index: number) => {
        setActiveCardMode('DELETE');
        setActiveCardIndex(index);
    }

    const onClickEdit = (index: number) => {
        setActiveCardIndex(index);
        setIsCreateModalOpen(true)
        setForm(identifications[index]);
        setFormMode('EDIT')
    }

    const onClickCancel = () => {
        setActiveCardMode("");
    }

    const onClickConfirmDelete = async (index: number) => {
        try {
            await axiosDelete(`identifications/${identifications[index].ID}`);
            await fetchIdentifications();
            showSuccessToast("Credential deleted!")
        } catch (err) {
            console.log(err);
            showErrorToast("Error deleting credential")
        }

        setActiveCardMode("");
    }

    const onClickDetails = (index: any) => {
        console.log('on click card')
        setIsDetailsModalOpen(true)
        setActiveCardIndex(index)

        console.log(activeCardIndex)
    }

    return (
        <>
            <Row >
                <Col md={3} className='my-3'>
                    <IdentificationCard
                        isCreateButton={true}
                        onOpenCreateIdentificationModal={onOpenCreateIdentificationModal}
                    />
                </Col>
                {identifications.map((identification: any, index: any) => {
                    const isActiveCard = index === activeCardIndex;

                    return <Col md={3} className='my-3' key={index}>
                        <IdentificationCard
                            identification={identification}
                            isActiveCard={isActiveCard}
                            activeCardMode={activeCardMode}
                            index={index}
                            onClickDelete={onClickDelete}
                            onClickEdit={onClickEdit}
                            onClickCancel={onClickCancel}
                            onClickConfirmDelete={onClickConfirmDelete}
                            onClickDetails={() => onClickDetails(index)}
                        />
                    </Col>
                })}
            </Row>
            <Modal show={isCreateModalOpen}>
                <div className='d-flex justify-end'>
                    <IoMdClose className='text-2xl mr-2 mt-2 hover:cursor-pointer' onClick={onCloseIdentificationModal} />
                </div>
                <div className='p-3'>
                    <IdentificationForm
                        form={form}
                        onChangeForm={onChangeForm}
                        onChangeField={formOnChange}
                        onSubmitForm={() => formMode === 'CREATE' ? onConfirmCreate() : onClickConfirmEdit(activeCardIndex)}
                    />
                </div>
            </Modal>
            <Modal show={isDetailsModalOpen}>
                <div className='d-flex justify-end'>
                    <IoMdClose className='text-2xl mr-2 mt-2 hover:cursor-pointer' onClick={onCloseDetailsModal} />
                </div>
                <div className='p-3'>
                    <IdentificationDetails
                        identification={identifications[activeCardIndex]}
                    />
                </div>
            </Modal>
        </>
    );
};

export default FileUpload;
