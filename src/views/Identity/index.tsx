import Modal from 'react-bootstrap/Modal'
import { Button } from '../../components/ui/button'
import { patch, performOCR, post } from '../../helper/axiosHelper';
import React, { useState } from 'react';
import IdentityForm from './components/identityForm';
import { IoMdClose } from 'react-icons/io';
import { INITIAL_KTP_FORM, TOAST_ICON } from '../../config';
import { onChangeInputText } from '../../helper/onChangeInputText';
import { useDispatch } from 'react-redux';
import { showToast } from '../../features/toast/toastSlice';

const FileUpload = () => {
    const dispatch = useDispatch()

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [identities, setIdentities] = useState<any>([]);
    const [status, setStatus] = useState<string>('');
    // const [processedImageUrl, setProcessedImageUrl] = useState<string | null>(null);
    const [ocrData, setOcrData] = useState({})
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [activeCardMode, setActiveCardMode] = useState("")
    const [form, setForm] = useState(INITIAL_KTP_FORM);
    const [formMode, setFormMode] = useState('EDIT')
    const [activeCardIndex, setActiveCardIndex] = useState<number>(0);

    const fetchIdentities = () => {

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

    const onCloseIdentityModal = () => {
        setIsCreateModalOpen(false)
    }

    const onOpenCreateIdentityModal = () => {
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
        fetchIdentities()
    }

    const onClickConfirmEdit = async (index: number) => {
        try {
            const response = await patch(`passwords/${identities[index].ID}`, form);

            identities[index] = response.data;

            showSuccessToast("Credential edited!")
        } catch (err) {
            console.log(err);
            showErrorToast("Error deleting credential")
        }

        setActiveCardMode("");
        setIsCreateModalOpen(false)
        fetchIdentities()
    }

    return (
        <>
            <div style={{ padding: '20px', maxWidth: '500px', margin: 'auto' }}>
                <Button onClick={onOpenCreateIdentityModal}>
                    Add identity credential
                </Button>
                <h1>Image Upload and Processing</h1>
                <input
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={handleFileChange}
                    style={{ marginBottom: '10px' }}
                />
                {status && <p>{status}</p>}
                {JSON.stringify(ocrData)}

            </div>
            <Modal show={isCreateModalOpen}>
                <div className='d-flex justify-end'>
                    <IoMdClose className='text-2xl mr-2 mt-2 hover:cursor-pointer' onClick={onCloseIdentityModal} />
                </div>
                <div className='p-3'>
                    <IdentityForm
                        form={form}
                        onChangeForm={onChangeForm}
                        onChangeField={formOnChange}
                        onSubmitForm={() => formMode === 'CREATE' ? onConfirmCreate() : onClickConfirmEdit(activeCardIndex)}
                    />
                </div>
            </Modal>
        </>
    );
};

export default FileUpload;
