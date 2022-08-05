import styles from './BurgerMenu.module.scss';
import cls from 'classnames';
import { useState } from 'react';

const BurgerMenu = (props: any) => {
  return (
    <div className={styles.burgerContainer}>
      <div className={styles.burger__header}>
        <div className={styles.burger__headerLeft}>
          <div>
            Menu
          </div>
        </div>
        <div className={styles.burger} onClick={props.onClose}>
          <div className={styles.burger}>
            <div className={styles.header__burger}>
              <div className={styles.burgerMenu}>
                <hr className={styles.burgerLine} />
                <hr className={styles.burgerLine} />
                <hr className={styles.burgerLine} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ul className={styles.burger__list}>
        <li className={styles.burger__item}>Burger menu item</li>
        <li className={styles.burger__item}>Burger menu item</li>
        <li className={styles.burger__item}>Burger menu item</li>
        <li className={styles.burger__item}>Burger menu item</li>
        <li className={styles.burger__item}>Burger menu item</li>
      </ul>
    </div>
  )
};

export default BurgerMenu;
