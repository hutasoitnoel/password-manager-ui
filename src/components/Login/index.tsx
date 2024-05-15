import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import Button from 'react-bootstrap/Button';
import { ENDPOINT } from '../../config';
import { post } from '../../helper/axiosHelper';
import './styles.css'

const Login = () => {
    const navigate = useNavigate();

    const onSubmit = async (values: object) => {
        try {
            await post(ENDPOINT.LOGIN, values)
            navigate("/")
        } catch (err: any) {
            console.log(err.response);
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
