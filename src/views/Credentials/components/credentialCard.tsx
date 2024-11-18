
import { Card, CardHeader, CardContent, CardFooter, CardDescription } from '../../../components/ui/card'
import { Button } from '../../../components/ui/button'
import { Label } from '../../../components/ui/label'
import CredentialForm from './credentialForm'
import { CARD_MODE, CREDENTIALS_FIELD_LABEL_MAPPER } from '../../../config'
import { Credential } from '../types'
import { useEffect, useRef, useState } from 'react'
import { CiMenuBurger } from "react-icons/ci";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

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
    onClickConfirmDelete,
}: any) => {
    const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false)

    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsBurgerMenuOpen(false); // Close menu if clicked outside
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleBurgerMenu = () => {
        setIsBurgerMenuOpen((prev) => !prev);
    };

    const displayCredential = (credential: Credential) => (
        <>
            <div className='relative d-flex justify-end'>
                <CiMenuBurger className='mr-4 mt-3 hover:cursor-pointer' onClick={toggleBurgerMenu} />
                {isBurgerMenuOpen && (
                    <div ref={menuRef} className="absolute bg-white rounded-lg shadow-lg">
                        <Label
                            onClick={() => {
                                onClickEdit(index)
                                toggleBurgerMenu()
                            }}
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-200 hover:cursor-pointer d-flex">
                            <FaRegEdit className='mr-2' />
                            <span>Edit</span>
                        </Label>
                        <Label
                            onClick={() => onClickDelete(index)}
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-200 hover:cursor-pointer d-flex">
                            <MdDeleteOutline className='mr-2' />
                            <span>Delete</span>
                        </Label>
                    </div>
                )}
            </div>
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
                <CardDescription className='mb-2'>{credential.website_url}</CardDescription>
                <CardDescription className='mb-1'>
                    <strong>
                        {CREDENTIALS_FIELD_LABEL_MAPPER.username}
                    </strong>
                </CardDescription>
                <CardDescription className='mb-2'>{credential.username}</CardDescription>
                <CardDescription className='mb-1'>
                    <strong>
                        {CREDENTIALS_FIELD_LABEL_MAPPER.password}
                    </strong>
                </CardDescription>
                <CardDescription className='mb-2'>{credential.password}</CardDescription>
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

    const deleteModeDisplay = <>
        <CardDescription className='mb-2'>
            Are you sure you want to delete this credential?
        </CardDescription>
        <div className='w-full d-flex justify-evenly'>
            <Button onClick={onClickCancel} variant='outline'>Cancel</Button>
            <Button onClick={() => onClickConfirmDelete(index)} variant='destructive' >Delete</Button>
        </div>
    </>

    const isDeleteMode = isActiveCard && activeCardMode === CARD_MODE.DELETE

    return <Card className={`card-style d-flex flex-col justify-center min-h-72 ${isDeleteMode && 'items-center text-center'}`}>
        {
            isDeleteMode ? deleteModeDisplay : displayCredential(credential)
        }
    </Card>
}

export default CredentialCard;
