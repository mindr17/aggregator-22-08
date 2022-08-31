import styles from './Navbar.module.scss';
import Link from "next/link";
import { useRouter } from 'next/router';

const navgation = [
  { id: 1, title: 'Home', path: '/' },
  { id: 2, title: 'News', path: '/news' },
  { id: 2, title: 'Backtesting', path: '/backtesting' },
]


const Navbar: React.FC = () => {
  const { pathname } = useRouter();

  return (
    <nav className={styles.nav}>
      {navgation.map(({ id, title, path }) => (
        <Link key={id} href={path}>
          <a className={pathname === path ? styles.active : null}>{title}</a>
        </Link>
      ))}
    </nav>
  )
}

export default Navbar;