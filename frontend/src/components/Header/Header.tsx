import Image from 'next/image';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/AuthContext';
import useAuth from '../../hooks/auth.hook';
import styles from './Header.module.scss';
import Navbar from './Navbar/Navbar';
import ThemeToggle from './Navbar/ThemeToggle/ThemeToggle';

const Header: React.FC = () => {
  const auth = useContext(AuthContext);
  const { token } = useAuth();
  const router = useRouter();
  const isAuthenticated = (!!token);
  console.log(isAuthenticated);

  const logoutHandler = () => {
    auth.logout();
    router.push('/');
  };




  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.logo}>
          <Image src='/img/icons8-financial-analytics-64.png' width={60} height={60} alt='logo' />
        </h1>
        {isAuthenticated && <Navbar />}
        <div className={styles.authGroup}>
          {isAuthenticated ?
            <>
              <button className={styles.btn} onClick={logoutHandler}>Logout</button>
              <div className={styles.imageWrapper}>
                <Image src='/img/abstract-user-flat-4.svg' width={45} height={45} alt='avatar' />
              </div>
            </> :
            <button className={styles.btn}>Login</button>}

        </div>
        <div>
          <ThemeToggle />
          <input type='select' />
        </div>
      </div>
    </header>
  );
};

export default Header;
