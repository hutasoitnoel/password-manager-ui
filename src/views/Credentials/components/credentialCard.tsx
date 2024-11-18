
import { Card, CardHeader, CardContent, CardFooter, CardDescription } from '../../../components/ui/card'
import { Button } from '../../../components/ui/button'
import CredentialForm from './credentialForm'
import { CARD_MODE, CREDENTIALS_FIELD_LABEL_MAPPER } from '../../../config'
import { Credential } from '../types'

type CredentialCardProps = {
    logos: any,
    credential: Credential,
    isActiveCard: any,
    activeCardMode: any,
    index: any,
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
    onClickDelete,
    onClickEdit,
    onClickCancel,
    onClickConfirmDelete
}: any) => {
    const displayCredential = (credential: Credential) => (
        <>
            <CardHeader className='d-flex align-items-center'>
                {
                    logos[credential.website_name]
                        ? <img
                            src={logos[credential.website_name]}
                            className='card-website-logo'
                            alt={credential.website_name}
                        />
                        : <CardDescription>{credential.website_name}</CardDescription>
                }
            </CardHeader>
            <CardContent>
                <CardDescription className='mb-1'>
                    <strong>
                        {CREDENTIALS_FIELD_LABEL_MAPPER.website_url}
                    </strong>
                </CardDescription>
                <CardDescription>{credential.website_url}</CardDescription>
                <CardDescription className='mb-1'>
                    <strong>
                        {CREDENTIALS_FIELD_LABEL_MAPPER.username}
                    </strong>
                </CardDescription>
                <CardDescription>{credential.username}</CardDescription>
                <CardDescription className='mb-1'>
                    <strong>
                        {CREDENTIALS_FIELD_LABEL_MAPPER.password}
                    </strong>
                </CardDescription>
                <CardDescription>{credential.password}</CardDescription>
            </CardContent>
        </>
    )

    const displayButtons = () => {
        const deleteModeButtons = <>
            <Button onClick={onClickCancel} variant='outline'>Cancel</Button>
            <Button onClick={() => onClickConfirmDelete(index)} variant='destructive' >Delete</Button>
        </>
        const defaultModeButtons = <>
            <Button onClick={() => onClickDelete(index)} variant='destructive'>Delete</Button>
            <Button onClick={() => onClickEdit(index)} >Edit</Button>
        </>

        const isDeleteMode = isActiveCard && activeCardMode === CARD_MODE.DELETE

        return <CardFooter className='d-flex justify-content-between'>
            {
                isDeleteMode ? deleteModeButtons
                    : defaultModeButtons
            }
        </CardFooter>
    }

    return <Card className='card-style'>
        {displayCredential(credential)}
        {displayButtons()}
    </Card>
}

export default CredentialCard;
