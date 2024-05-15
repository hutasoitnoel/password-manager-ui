import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { showToast } from '../../features/toast/toastSlice'
import { ENDPOINT, TOAST_ICON } from '../../config';
import { post } from '../../helper/axiosHelper';
import './styles.css'

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onSubmit = async (values: object) => {
        try {
            await post(ENDPOINT.LOGIN, values)
            dispatch(showToast({ icon: TOAST_ICON.SUCCESS, text: 'Successfully logged in!' }))
            navigate("/")
        } catch (err: any) {
            dispatch(showToast({ icon: TOAST_ICON.ERROR, text: 'Login failed' }))
        }
    }

    return <div className='container my-3'>
        <h2>Login</h2>
        <Formik
            initialValues={{
                username: "",
                password: ""
            }}
            onSubmit={onSubmit}
        >
            <Form className='login-form'>
                <label>Username</label>
                <Field name="username" />
                <label>Password</label>
                <Field name="password" />
                <Button
                    size='sm'
                    className='my-2'
                    type='submit'
                    variant='info'>
                    Submit
                </Button>
            </Form>
        </Formik>
    </div>
}

export default Login;
