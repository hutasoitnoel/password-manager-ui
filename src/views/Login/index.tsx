import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showToast } from '../../features/toast/toastSlice'
import { ENDPOINT, TOAST_ICON } from '../../config';
import { post } from '../../helper/axiosHelper';
import UserForm from '../../components/userForm';
import { Label } from '../../components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '../../components/ui/card'
import './styles.css'

const Login = ({ type }: any) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

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
            failMessage: 'Login failed'
        })
    }

    const onSubmitRegister = (values: any) => {
        onSubmit({
            endpoint: ENDPOINT.REGISTER,
            payload: values,
            successMessage: 'New account registered! Please login',
            failMessage: 'Register failed'
        })
    }

    const loginForm = <>
        <CardHeader>
            <CardTitle>Log in</CardTitle>
            <CardDescription>Fill in your credentials</CardDescription>
        </CardHeader>
        <UserForm onSubmit={onSubmitLogin} />
        <CardFooter>
            <Label className='text-sm'>
                Don't have an account? <Link
                    to='/register'
                    className='change-link'
                >
                    Sign up
                </Link>
            </Label>
        </CardFooter>
    </>

    const registerForm = <>
        <CardHeader>
            <CardTitle>Sign up</CardTitle>
            <CardDescription>Fill in your credentials</CardDescription>
        </CardHeader>
        <UserForm onSubmit={onSubmitRegister} />
        <CardFooter>
            <Label className='text-sm'>
                Already have an account? <Link
                    to='/login'
                    className='change-link'
                >
                    Log in
                </Link>
            </Label>
        </CardFooter>
    </>

    return <div className='container d-flex justify-center items-center min-h-screen'>
        <Card className="w-[350px]">
            {
                type === 'LOGIN' ? loginForm : registerForm
            }
        </Card>
    </div>
}

export default Login;
