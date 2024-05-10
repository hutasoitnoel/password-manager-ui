import React from 'react';
import Toast from 'react-bootstrap/Toast'

import errorIcon from '../../icons/error.svg'
import successIcon from '../../icons/success.svg'
import { TOAST_ICON } from '../../config';

interface CommonToastProps {
    show: boolean,
    onClose: () => void,
    icon: string,
    text: string
}

const CommonToast: React.FC<CommonToastProps> = ({
    show,
    onClose,
    icon,
    text
}) => {
    let src;

    switch (icon) {
        case TOAST_ICON.SUCCESS:
            src = successIcon
            break;
        case TOAST_ICON.ERROR:
            src = errorIcon
            break;
        default:
            break;
    }

    return <Toast
        show={show}
        onClose={onClose}
        className='toast-position'
        delay={3000}
        autohide
    >
        <Toast.Body>
            <img src={src} className="rounded me-2" alt="toast-icon" height={15} />
            <strong className="me-auto">{text}</strong>
        </Toast.Body>
    </Toast>
}

export default CommonToast