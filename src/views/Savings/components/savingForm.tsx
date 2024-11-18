import React from 'react';
import Form from 'react-bootstrap/Form'
import { SavingFormType } from '../types';
import { SAVINGS_FIELD_LABEL_MAPPER, savingFormFields } from '../../../config';

interface SavingFormProps {
    form: SavingFormType,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

const SavingForm: React.FC<SavingFormProps> = ({
    form,
    onChange
}) => {
    return <Form.Group className="mb-3">
        {
            savingFormFields.map((field) => <>
                <Form.Label className='mb-1'>
                    <strong>
                        {SAVINGS_FIELD_LABEL_MAPPER[field]}
                    </strong>
                </Form.Label>
                <Form.Control
                    type="text"
                    value={form[field]}
                    onChange={onChange}
                    name={field}
                    className='mb-3'
                />
            </>
            )
        }
    </Form.Group>
}

export default SavingForm