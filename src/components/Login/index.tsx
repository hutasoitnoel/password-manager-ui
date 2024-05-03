import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { ENDPOINT } from '../../config';
import { post } from '../../helper/axiosHelper';

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

    return <div>
        <h1>Login</h1>
        <Formik
            initialValues={{
                username: "",
                password: ""
            }}
            onSubmit={onSubmit}
        >
            <Form>
                <label>Username</label>
                <Field name="username" placeholder="Username" />
                <label>Password</label>
                <Field name="password" placeholder="Password" />
                <button type="submit">Submit</button>
            </Form>
        </Formik>
    </div>
}

export default Login;
