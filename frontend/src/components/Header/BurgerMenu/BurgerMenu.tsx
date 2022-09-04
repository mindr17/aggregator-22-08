import styles from './BurgerMenu.module.scss';

const BurgerMenu = (props: any) => {
  return (
    <div className={styles.burgerMenuContainer}>
      <div className={styles.menu__header}>
        <div className={styles.burger__headerLeft}>
          <button className={styles.burgerMenuCloseBtn} onClick={props.onClose}>
            <div className={styles.burgerMenu}>
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
