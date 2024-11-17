import { useState } from "react"
import { Field, Form, Formik } from "formik"
import Button from "react-bootstrap/Button"
import { FaEye, FaEyeSlash } from "react-icons/fa";
import './styles.css'

const UserForm = ({
    onSubmit
}: any) => {
    const [showPassword, setShowPassword] = useState(false)

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    return <Formik
        initialValues={{
            username: "",
            password: ""
        }}
        onSubmit={onSubmit}
    >
        <Form className='login-form'>
            <label>Username</label>
            <Field
                name="username"
                type='text'
            />
            <label>Password</label>
            <div style={{ position: 'relative' }}>
                <Field
                    name="password"
                    type={showPassword ? "text" : "password"}
                    className='password-field'
                />
                <span
                    className="password-icon"
                    onClick={togglePasswordVisibility}
                >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
            </div>
            <Button
                size='sm'
                className='my-2'
                type='submit'
                variant='info'>
                Submit
            </Button>
        </Form>
    </Formik>
}

export default UserForm