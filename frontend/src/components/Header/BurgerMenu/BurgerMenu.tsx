import Link from 'next/link';
import Navbar from '../Navbar/Navbar';
import styles from './BurgerMenu.module.scss';

const BurgerMenu = (props: any) => {
  return (
    <div className={styles.burgerMenuContainer}>
      <div className={styles.menu__header}>
        <div className={styles.burger__headerLeft}>
          <button className={styles.burgerMenuCloseBtn} onClick={props.onClose}>
            <div className={styles.burgerMenuCloseContainer}>
              <hr className={styles.burgerLine} />
              <hr className={styles.burgerLine} />
              <hr className={styles.burgerLine} />
            </div>
          </button>
          <div>
            Menu
          </div>
        </div>
      </div>
      <ul className={styles.burger__list} onClick={props.onClose}>
        <li className={styles.burger__item}>
          <Link href={'/'}>
            <a className={styles.burgerLink}>
              Home
            </a>
          </Link>
        </li>
        <li className={styles.burger__item}>
          <Link href={'/news'}>
            <a className={styles.burgerLink}>
              News
            </a>
          </Link>
        </li>
        {/* <li className={styles.burger__item}>
          <Link href={'Backtesting'}>Home</Link>
        </li> */}
        {/* <Navbar /> */}
      </ul>
    </div>
  );
};

export default BurgerMenu;
