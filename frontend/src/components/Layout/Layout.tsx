import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import styles from './Layout.module.scss';
import AuthContext from '../../context/AuthContext';
import useAuth from '../../hooks/auth.hook';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

type Props = {
  children?: React.ReactNode;
};

const Layout = ({ children }: Props) => {

  const { login, logout, token, userId } = useAuth();
  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ login, logout, token, userId, isAuthenticated }}>
      <div className={styles.layout}>
        <Header />
        <main className={styles.main}>{children}</main>
        <Footer />
        <ToastContainer
          position="top-center"
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
