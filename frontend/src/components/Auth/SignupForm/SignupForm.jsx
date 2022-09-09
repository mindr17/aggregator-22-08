import styles from './SignupForm.module.scss';
import React, { useEffect, useState } from 'react';
import useHttp from '../../../hooks/http.hook';
import useMessage from '../../../hooks/message.hook';
import { config } from '../../../config';

function SignupForm({ handleShowLogin }) {
  const { load, error, request, clearError } = useHttp();
  const message = useMessage();
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

  const registerHandler = async () => {
    try {
      const data = await request(`${config.authUrl}/register`, 'POST', { ...form });
      message(data.message);
      clearForm();
    } catch (err) {
      console.log(err);
    }
  };

  const showPassword = () => {
    setShow(!show);
  };

  return (
    <div className={styles.signup}>
      <h2 className={styles.formTitle}>Create your account</h2>
      <form className={styles.signupForm}>
        <div className={styles.formField}>
          <label htmlFor='email'>Email</label>
          <input
            placeholder='Enter your email'
            id='email'
            type='email'
            name='email'
            value={form.email}
            autoComplete='on'
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
            onChange={changeHandler}
          />
          {show ? (
            <span aria-hidden onClick={showPassword} className={styles.spanOn} />
          ) : (
            <span aria-hidden onClick={showPassword} className={styles.spanOff} />
          )}
        </div>
        <button className={styles.formBtn} onClick={registerHandler} disabled={load} type='button'>
          Sign up
        </button>
      </form>
      <div>
        Already have an account?{' '}
        <span className={styles.span} onClick={handleShowLogin}>
          Log In
        </span>
      </div>
    </div>
  );
}

export default SignupForm;
