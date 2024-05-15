import React from 'react';
import Toast from 'react-bootstrap/Toast'
import { useDispatch, useSelector } from 'react-redux';
import errorIcon from '../../icons/error.svg'
import successIcon from '../../icons/success.svg'
import { TOAST_ICON } from '../../config';
import { RootState } from '../../store'
import { hideToast } from '../../features/toast/toastSlice'

const CommonToast = () => {
    const { show, message } = useSelector((state: RootState) => state.toast);
    const dispatch = useDispatch();

    let src;

    switch (message.icon) {
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
        onClose={() => dispatch(hideToast())}
        className='toast-position'
        delay={3000}
        autohide
    >
        <Toast.Body>
            <img src={src} className="rounded me-2" alt="toast-icon" height={15} />
            <strong className="me-auto">{message.text}</strong>
        </Toast.Body>
    </Toast>
}

export default CommonToast