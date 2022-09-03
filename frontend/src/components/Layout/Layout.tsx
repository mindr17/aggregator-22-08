import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import styles from './Layout.module.scss';
import AuthContext from '../../context/AuthContext';
import useAuth from '../../hooks/auth.hook';
import Router from 'next/router';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useEffect, useState } from 'react';

type Props = {
  children?: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const { login, logout, token, userId } = useAuth();

  const [isShowForm, setIsShowForm] = useState(false);
  const toggleShowForm = () => {
    setIsShowForm(!isShowForm);
  };

  const isAuthenticated = !!token;

  useEffect(() => {
    const { pathname } = Router;
    if (!isAuthenticated && pathname !== '/') {
      setTimeout(() => Router.push('/'), 3000);
    }
  });

  return (
    <AuthContext.Provider value={{ login, logout, token, userId, isAuthenticated, isShowForm, toggleShowForm }}>
      <div className={styles.layout}>
        <Header />
        <main className={styles.main}>{children}</main>
        <Footer />
        <ToastContainer
          position='top-center'
          autoClose={1500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </AuthContext.Provider>
  );
};

export default Layout;
