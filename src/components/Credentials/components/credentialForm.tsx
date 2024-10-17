import React from 'react';
import { CredentialFormType } from '../types';
import { CREDENTIALS_FIELD_LABEL_MAPPER, credentialFormFields } from '../../../config';

interface CredentialFormProps {
    form: CredentialFormType,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

const CredentialForm: React.FC<CredentialFormProps> = ({
    form,
    onChange
}) => {
    return <></>
    // <Form.Group className="mb-3">
    //     {
    //         credentialFormFields.map((field) => <>
    //             <Form.Label className='mb-1'>
    //                 <strong>
    //                     {CREDENTIALS_FIELD_LABEL_MAPPER[field]}
    //                 </strong>
    //             </Form.Label>
    //             <Form.Control
    //                 type="text"
    //                 value={form[field]}
    //                 onChange={onChange}
    //                 name={field}
    //                 className='mb-3'
    //             />
    //         </>
    //         )
    //     }
    // </Form.Group>
}

export default CredentialForm