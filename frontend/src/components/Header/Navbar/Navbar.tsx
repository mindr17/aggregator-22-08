import styles from './Navbar.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';
import AuthContext from '../../../context/AuthContext';
import { useContext } from 'react';

const navigation = [
  { id: 1, title: 'Home', path: '/', },
  { id: 2, title: 'News', path: '/news', },
  { id: 3, title: 'Add news', path: '/addnews', needAuth: true, needAdmin: true,},
  // { id: 4, title: 'Backtesting', path: '/backtesting', needAuth: true, },
];

const Navbar: React.FC = () => {
  const { pathname } = useRouter();
  const auth = useContext(AuthContext);

  return (
    <nav className={styles.nav}>
      {/* <ul className={styles.navList}> */}
        {navigation.filter((item: any) => {
          if (!auth.token && item.needAuth) return false;

          return true;
        }).map(({ id, title, path }) => (
          // <li className={styles.navItem}>
            <Link key={id} href={path}>
              <a className={pathname === path ? styles.active : null}>{title}</a>
            </Link>
          // {/* </li> */}
        ))}
      {/* </ul> */}
    </nav>
  );
};

export default Navbar;
