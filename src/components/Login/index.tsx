import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showToast } from '../../features/toast/toastSlice'
import { ENDPOINT, TOAST_ICON } from '../../config';
import { post } from '../../helper/axiosHelper';
import './styles.scss'

interface Credential {
    username: String;
    password: String;
}

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [credentials, setCredentials] = useState<Credential>({
        username: '',
        password: ''
    });

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        console.log(credentials)

        // try {
        //     await post(ENDPOINT.LOGIN, values)
        //     dispatch(showToast({ icon: TOAST_ICON.SUCCESS, text: 'Successfully logged in!' }))
        //     navigate("/")
        // } catch (err: any) {
        //     dispatch(showToast({ icon: TOAST_ICON.ERROR, text: 'Login failed' }))
        // }
    }

    const onChangeText = (event: ChangeEvent<HTMLInputElement>) => {
        setCredentials(initialValue => ({
            ...credentials,
            [event.target.name]: event.target.value
        }))

        console.log(credentials)
    }

    return <div className='login'>
        <div className='login-card'>
            <form className='login-card__form' onSubmit={onSubmit}>
                <label>Username</label>
                <input type="text" name='username' onChange={onChangeText} />
                <label>Password</label>
                <input type="text" name='password' onChange={onChangeText} />
                <button
                    className='my-2'
                    type='submit'
                >
                    Submit
                </button>
            </form>
        </div>
    </div>
}

export default Login;
