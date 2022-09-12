import { useState } from 'react';
import styles from './FiltersMenu.module.scss';

const FiltersMenu = (props: any) => {
  const applyFilters = () => {
    props.onClose();

  };

  return (
    <>
      <div className={styles.filtersMenuContainer}>
        <div className={styles.filtersMenuHeader}>
          <a className={styles.closeBtn} onClick={props.onClose}>
            <div className={styles.burgerMenu}>
              <div className={styles.closeLine}></div>
              <div className={styles.closeLine}></div>
            </div>
          </a>
        </div>
        <ul className={styles.menu__list} onClick={props.onClose}>
          <li className={styles.menu__item}>
            Ticker
            {/* <Link href={'/'}>
              <a className={styles.burgerLink}>
                Home
              </a>
            </Link> */}
          </li>
          {/* <li className={styles.menu__item}>
            Keywords
            <Link href={'/news'}>
              <a className={styles.burgerLink}>
                News
              </a>
            </Link>
          </li> */}
          {/* <li className={styles.burger__item}>
            <Link href={'Backtesting'}>Home</Link>
          </li> */}
          {/* <Navbar /> */}
        </ul>
        <div className={styles.applyBtn} onClick={applyFilters}>
          Apply
        </div>
      </div>
    </>
  );
}

export default FiltersMenu;
