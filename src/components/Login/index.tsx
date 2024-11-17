import { useState } from 'react';
import { useNavigate, Link, Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showToast } from '../../features/toast/toastSlice'
import { ENDPOINT, TOAST_ICON } from '../../config';
import { post } from '../../helper/axiosHelper';
import UserForm from '../Credentials/components/userForm';
import './styles.css'

const Login = ({ type }: any) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formTab, setFormTab] = useState('LOGIN');

    const onSubmit = async ({ endpoint, payload, successMessage, failMessage }: any) => {
        try {
            await post(endpoint, payload)
            dispatch(showToast({ icon: TOAST_ICON.SUCCESS, text: successMessage }))
            navigate("/")
        } catch (err: any) {
            dispatch(showToast({ icon: TOAST_ICON.ERROR, text: failMessage }))
        }
    }

    const onSubmitLogin = (values: any) => {
        onSubmit({
            endpoint: ENDPOINT.LOGIN,
            payload: values,
            successMessage: 'Successfully logged in!',
            errorMessage: 'Login failed'
        })
    }

    const onSubmitRegister = (values: any) => {
        onSubmit({
            endpoint: ENDPOINT.REGISTER,
            payload: values,
            successMessage: 'New account registered! Please login',
            errorMessage: 'Register failed'
        })
    }

    const loginForm = <div>
        <h2>Log in</h2>
        <UserForm onSubmit={onSubmitLogin} />
        <p>Don't have an account?
            <Link
                to='/register'
                className='change-link'
            >
                Sign up
            </Link>
        </p>
    </div>

    const registerForm = <div>
        <h2>Sign up</h2>
        <UserForm onSubmit={onSubmitRegister} />
        <p>Already have an account?
            <Link
                to='/login'
                className='change-link'
            >
                Log in
            </Link>
        </p>
    </div>

    return <div className='container my-3'>
        <div className='user-form-container'>
            {
                type === 'LOGIN' ? loginForm : registerForm
            }
        </div>

    </div>
}

export default Login;
