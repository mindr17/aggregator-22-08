import styles from './Header.module.scss';
import Navbar from './Navbar/Navbar';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.logo}>Logo</h1>
        <Navbar />
        <button className={styles.login}>Login</button>
        <div>
          <input type='checkbox' />
          <input type='select' />
        </div>
      </div>
    </header>
  );
};

export default Header;
