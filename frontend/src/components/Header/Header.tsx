import styles from './Header.module.scss';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.logo}>Logo</h1>
        <nav>
          <div>News</div>
          <div>Backtesting</div>
        </nav>
        <button>Login</button>
        <div>
          <input type='checkbox' />
          <input type='select' />
        </div>
      </div>
    </header>
  );
};

export default Header;
