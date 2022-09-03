import Image from 'next/image';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/AuthContext';
import useMessage from '../../hooks/message.hook';
import styles from './Header.module.scss';
import Navbar from './Navbar/Navbar';
import ThemeToggle from './Navbar/ThemeToggle/ThemeToggle';

const Header: React.FC = () => {
  const auth = useContext(AuthContext);
  const router = useRouter();
  const message = useMessage();
  const isAuthenticated = !!auth.token;

  const logoutHandler = () => {
    message('You have successfully logged out!');
    setTimeout(() => {
      router.push('/');
      auth.logout();
    }, 3000);
  };

  const handleOnClick = () => {
    auth.toggleShowForm();
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.logo} onClick={() => router.push('/')}>
          <Image src='/img/icons8-financial-analytics-64.png' width={60} height={60} alt='logo' />
        </h1>
        {isAuthenticated && <Navbar />}
        <div className={styles.rightGroup}>
          <div className={styles.authGroup}>
            {isAuthenticated ? (
              <>
                <button className={styles.btn} onClick={logoutHandler}>
                  Logout
                </button>
                <div className={styles.imageWrapper}>
                  <Image src='/img/abstract-user-flat-4.svg' width={45} height={45} alt='avatar' />
                </div>
              </>
            ) : (
              <button className={styles.btn} onClick={handleOnClick}>Login</button>
            )}
          </div>
          <div className={styles.settings}>
            <select className={styles.select}>
              <option value='en'>EN</option>
              <option value='ru'>RU</option>
              <option value='de'>DE</option>
            </select>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
