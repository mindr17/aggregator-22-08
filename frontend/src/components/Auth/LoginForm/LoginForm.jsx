import styles from './LoginForm.module.scss';
import React, { useContext, useEffect, useState } from 'react';
import useHttp from '../../../hooks/http.hook';
import useMessage from '../../../hooks/message.hook';
import AuthContext from '../../../context/AuthContext';
import { useRouter } from 'next/router';
import { config } from '../../../config';

// interface IProps {
//     handleShowLogin: () => void,
// }

const LoginForm = ({ handleShowLogin }) => {
  const { load, error, request, clearError } = useHttp();
  const message = useMessage();
  const auth = useContext(AuthContext);
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const clearForm = () => {
    setForm({
      email: '',
      password: '',
    });
  };

  const loginHandler = async () => {
    try {
      const data = await request(`${config.authUrl}/login`, 'POST', { ...form });
      auth.login(data.token, data.userId);
      message(data.message);
      clearForm();
      auth.toggleShowForm();
      setTimeout(() => router.push('/news'), 3000);
    } catch (err) {
      console.log(err);
    }
  };

  const showPassword = () => {
    setShow(!show);
  };

  return (
    <div className={styles.login}>
      <h2>Log in to your account</h2>
      <form className={styles.loginForm}>
        <div className={styles.formField}>
          <label htmlFor='email'>Email</label>
          <input
            placeholder='Enter your email'
            id='email'
            type='email'
            name='email'
            value={form.email}
            onChange={changeHandler}
          />
        </div>
        <div className={styles.formField}>
          <label htmlFor='password'>Password</label>
          <input
            placeholder='Enter your password'
            id='password'
            type={show ? 'text' : 'password'}
            name='password'
            value={form.password}
            autoComplete='on'
            onChange={changeHandler}
          />
          {show ? (
            <span aria-hidden onClick={showPassword} className={styles.spanOn} />
          ) : (
            <span aria-hidden onClick={showPassword} className={styles.spanOff} />
          )}
        </div>
        <button className={styles.formBtn} onClick={loginHandler} disabled={load} type='button'>
          Log in
        </button>
      </form>
      <div>
        Don't have an account?{' '}
        <span className={styles.span} onClick={handleShowLogin}>
          Sign Up
        </span>
      </div>
    </div>
  );
};

export default LoginForm;
