import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import styles from './Layout.module.scss';

type Props = {
  children?: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
