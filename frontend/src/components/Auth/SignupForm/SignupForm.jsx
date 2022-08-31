import styles from './SignupForm.module.scss';
import React, { useContext, useEffect, useState } from 'react';
import useHttp from '../../../hooks/http.hook';
import useMessage from '../../../hooks/message.hook';
import AuthContext from '../../../context/AuthContext';

function SignupForm() {
    const { load, error, request, clearError } = useHttp();
    const message = useMessage();
    const auth = useContext(AuthContext);
    const [show, setShow] = useState(false);
    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    const changeHandler = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const registerHandler = async () => {
        try {
            const data = await request('http://localhost:5000/api/auth/register', 'POST', { ...form });
            message(data.message);
        } catch (err) {
            console.log(err);
        }
    };

    const loginHandler = async () => {
        try {
            const data = await request('http://localhost:5000/api/auth/login', 'POST', { ...form });
            auth.login(data.token, data.userId);
            message(data.message);
        } catch (err) {
            console.log(err);
        }
    };

    const showPassword = () => {
        setShow(!show);
    };

    return (
        <div className={styles.signup}>
            <div>
                <div>
                    <label htmlFor="email">
                        Email
                    </label>
                    <input
                        placeholder="Enter your email"
                        id="email"
                        type="email"
                        name="email"
                        onChange={changeHandler}
                    />
                </div>
                <div>
                    <label htmlFor="password">
                        Password
                    </label>
                    <input
                        placeholder="Enter your password"
                        id="password"
                        type={show ? 'text' : 'password'}
                        name="password"
                        onChange={changeHandler}
                    />
                    {show ? (
                        <span aria-hidden onClick={showPassword} className={styles.spanOn} />
                    ) : (
                        <span aria-hidden onClick={showPassword} className={styles.spanOff} />
                    )}
                </div>
            </div>
            <div>
                <button onClick={loginHandler} disabled={load} type="button">
                    Log in
                </button>
                <button onClick={registerHandler} disabled={load} type="button">
                    Sign up
                </button>
            </div>
        </div>
    );
}

export default SignupForm;