import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import Axios from 'axios';
import { BASE_URL } from '../../config';

const Login = () => {
    const navigate = useNavigate()

    const [cookies, setCookie, removeCookie] = useCookies(["Authorization"]);

    const [form, setForm] = useState({
        username: "",
        password: ""
    });

    const onSubmit = async (values: object, actions: object) => {
        try {
            const response = await Axios.post(`${BASE_URL}/login`, values, { withCredentials: true });
            setCookie("Authorization", response.data.token)
        } catch (err: any) {
            console.log(err.response);
        }

        try {
            await Axios.get(`${BASE_URL}/check-auth`, { withCredentials: true });
            navigate("/");
        } catch (err: any) {
            console.log(err.response);
        }
    }

    return <div>
        <h1>Login</h1>
        <Formik
            initialValues={form}
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
