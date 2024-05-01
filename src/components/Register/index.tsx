import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { Formik, Form, Field } from 'formik';
import Axios from 'axios';
import { BASE_URL } from '../../config';


const Register = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
        password: ""
    });

    const onSubmit = async (values: object, actions: object) => {
        console.log({ values, actions });
        console.log('ini form');

        try {
            await Axios.post(`${BASE_URL}/register`, values);

            navigate("/login")
        } catch (err: any) {
            console.log('fail login');

            console.log(err.response);
        }
    }

    return <div>
        <h1>Register</h1>
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
};

export default Register;