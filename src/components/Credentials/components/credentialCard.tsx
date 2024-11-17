import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import CredentialForm from './credentialForm'
import { CARD_MODE, CREDENTIALS_FIELD_LABEL_MAPPER } from '../../../config'
import { Credential } from '../types'

type CredentialCardProps = {
    logos: any,
    credential: Credential,
    isActiveCard: any,
    activeCardMode: any,
    index: any,
    form: any,
    formOnChange: any,
    onClickDelete: any,
    onClickEdit: any,
    onClickCancel: any,
    onClickConfirmEdit: any,
    onClickConfirmDelete: any
}

const CredentialCard = ({
    logos,
    credential,
    isActiveCard,
    activeCardMode,
    index,
    form,
    formOnChange,
    onClickDelete,
    onClickEdit,
    onClickCancel,
    onClickConfirmEdit,
    onClickConfirmDelete
}: CredentialCardProps) => {
    const displayForm = () => (
        <Card.Body>
            <CredentialForm
                form={form}
                onChange={formOnChange}
            />
        </Card.Body>
    )

    const displayCredential = (credential: Credential) => (
        <>
            <Card.Header className='d-flex align-items-center'>
                <Image
                    src={logos[credential.website_name]}
                    className='card-website-logo'
                />
                <Card.Text>{credential.website_name}</Card.Text>
            </Card.Header>
            <Card.Body>
                <Card.Text className='mb-1'>
                    <strong>
                        {CREDENTIALS_FIELD_LABEL_MAPPER.website_url}
                    </strong>
                </Card.Text>
                <Card.Text>{credential.website_url}</Card.Text>
                <Card.Text className='mb-1'>
                    <strong>
                        {CREDENTIALS_FIELD_LABEL_MAPPER.username}
                    </strong>
                </Card.Text>
                <Card.Text>{credential.username}</Card.Text>
                <Card.Text className='mb-1'>
                    <strong>
                        {CREDENTIALS_FIELD_LABEL_MAPPER.password}
                    </strong>
                </Card.Text>
                <Card.Text>{credential.password}</Card.Text>
            </Card.Body>
        </>
    )

    const displayButtons = () => {
        const editModeButtons = <>
            <Button onClick={onClickCancel} variant='danger'>Cancel</Button>
            <Button onClick={() => onClickConfirmEdit(index)} variant='info'>Confirm</Button>
        </>
        const deleteModeButtons = <>
            <Button onClick={onClickCancel} variant='info'>Cancel</Button>
            <Button onClick={() => onClickConfirmDelete(index)} variant='danger'>Delete</Button>
        </>
        const defaultModeButtons = <>
            <Button onClick={() => onClickDelete(index)} variant='danger'>Delete</Button>
            <Button onClick={() => onClickEdit(index)} variant='info'>Edit</Button>
        </>

        const isEditMode = isActiveCard && activeCardMode === CARD_MODE.EDIT
        const isDeleteMode = isActiveCard && activeCardMode === CARD_MODE.DELETE

        return <Card.Footer>
            <div className='d-flex justify-content-between'>
                {
                    isEditMode ? editModeButtons
                        : isDeleteMode ? deleteModeButtons
                            : defaultModeButtons
                }
            </div>
        </Card.Footer>
    }

    return <Card className='card-style'>
        {
            isActiveCard && activeCardMode === CARD_MODE.EDIT
                ? displayForm()
                : displayCredential(credential)
        }
        {displayButtons()}
    </Card>
}

export default CredentialCard;
