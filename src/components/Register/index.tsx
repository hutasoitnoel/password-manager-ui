import React from 'react';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { showToast } from '../../features/toast/toastSlice'
import { ENDPOINT, TOAST_ICON } from '../../config';
import { post } from '../../helper/axiosHelper';
import './styles.css';

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onSubmit = async (values: object) => {
        try {
            await post(ENDPOINT.REGISTER, values)
            dispatch(showToast({ icon: TOAST_ICON.SUCCESS, text: 'New account registered! Please login' }))
            navigate("/login")
        } catch (err: any) {
            dispatch(showToast({ icon: TOAST_ICON.ERROR, text: 'Registration failed' }))
            console.log(err.response);
        }
    }

    return <div className='container my-3'>
        <h2>Register</h2>
        {/* <Formik
            initialValues={{
                username: "",
                password: ""
            }}
            onSubmit={onSubmit}
        >
            <Form className='register-form'>
                <label>Username</label>
                <Field name="username" />
                <label>Password</label>
                <Field name="password" />
                <Button
                    size='sm'
                    className='my-2'
                    type='submit'
                    variant='info'
                >
                    Submit
                </Button>
            </Form>
        </Formik> */}
    </div>
};

export default Register;