import styles from './Navbar.module.scss';
import Link from "next/link";


const Navbar: React.FC = () => {
    return (
        <nav className={styles.nav}>
            <Link href='/'><a>Home</a></Link>
            <Link href='/news'><a>News</a></Link>
            <Link href='/backtesting'><a>Backtesting</a></Link>
        </nav>
    )
}

export default Navbar;