
import { Card, CardHeader, CardContent, CardFooter, CardDescription } from '../../../components/ui/card'
import { Button } from '../../../components/ui/button'
import { Label } from '../../../components/ui/label'
import IdentificationForm from './identificationForm'
import { CARD_MODE, CREDENTIALS_FIELD_LABEL_MAPPER, KTP_FIELD_LABEL_MAPPER } from '../../../config'
import { useEffect, useRef, useState } from 'react'
import { CiMenuBurger } from "react-icons/ci";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { IoIosCreate } from "react-icons/io";
import { FaAddressCard } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";

const IdentificationCard = ({
    isCreateButton,
    onOpenCreateIdentificationModal,
    identification,
    isActiveCard,
    activeCardMode,
    index,
    onClickDetails,
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

    if (isCreateButton) {
        return <Card
            onClick={onOpenCreateIdentificationModal}
            className={`card-style d-flex flex-col justify-center items-center min-h-64 hover:cursor-pointer`}
        >
            <FaAddressCard className='text-4xl mb-2' />
            <Label className='text-xl hover:cursor-pointer'>Add a new identification</Label>
        </Card>
    }

    const toggleBurgerMenu = () => {
        setIsBurgerMenuOpen((prev) => !prev);
    };

    const displayIdentification = (credential: any) => (
        <>
            <div className='relative d-flex justify-end'>
                <FaMagnifyingGlass className='mr-4 hover:cursor-pointer' onClick={onClickDetails}/>
                <CiMenuBurger className='mr-4 hover:cursor-pointer' onClick={toggleBurgerMenu} />
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
                            onClick={() => {
                                onClickDelete(index)
                                toggleBurgerMenu()
                            }}
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-200 hover:cursor-pointer d-flex">
                            <MdDeleteOutline className='mr-2' />
                            <span>Delete</span>
                        </Label>
                    </div>
                )}
            </div>
            <CardContent>
                <CardDescription className='mb-1'>
                    <strong>
                        ID Type
                    </strong>
                </CardDescription>
                <CardDescription className='mb-2'>{identification.type || '-'}</CardDescription>
                <CardDescription className='mb-1'>
                    <strong>
                        {KTP_FIELD_LABEL_MAPPER.id_number}
                    </strong>
                </CardDescription>
                <CardDescription className='mb-2'>{identification.id_number || '-'}</CardDescription>
                <CardDescription className='mb-1'>
                    <strong>
                        {KTP_FIELD_LABEL_MAPPER.name}
                    </strong>
                </CardDescription>
                <CardDescription className='mb-2'>{identification.name || '-'}</CardDescription>
            </CardContent>
        </>
    )

    const deleteModeDisplay = <>
        <CardDescription className='mb-2'>
            Are you sure you want to delete this identification info?
        </CardDescription>
        <div className='w-full d-flex justify-evenly'>
            <Button onClick={onClickCancel} variant='outline'>Cancel</Button>
            <Button onClick={() => onClickConfirmDelete(index)} variant='destructive' >Delete</Button>
        </div>
    </>

    const isDeleteMode = isActiveCard && activeCardMode === CARD_MODE.DELETE

    return <Card
        className={`card-style d-flex flex-col justify-center min-h-64 ${isDeleteMode && 'items-center text-center'}`}
    >
        {
            isDeleteMode ? deleteModeDisplay : displayIdentification(identification)
        }
    </Card>
}

export default IdentificationCard;
