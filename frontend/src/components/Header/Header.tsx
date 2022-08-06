import styles from './Header.module.scss';
import cls from 'classnames';
import { useState } from 'react';
import { IGood } from '../../frontendTypes';
import BurgerMenu from './BurgerMenu/BurgerMenu';

interface IHeaderProps {
  cartState: Array<IGood>;
  onCartOpen: () => void;
}

const Header = (props: IHeaderProps) => {
  const { cartState, ...restProps} = props;

  const [burgerState, setBurgerState] = useState<boolean>(false);

  const onBurgerMenuOpen = () => {
    setBurgerState(!burgerState);
  };

  const addBurger = () => {
    if (burgerState) {
      return <BurgerMenu onClose={() => {setBurgerState(false)}} />
    }
  };

  return (
    <header className={styles.header}>
      <h1 className={styles.header__logo}>Store</h1>

      <div className={styles.header__right}>
        <a className={cls(styles.header__cart, styles.cart)} onClick={restProps.onCartOpen}>
          {/* <span className={styles.cart__counter}>{cartState.length}</span> */}
          <svg className={styles.cart__icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path fill="currentColor" d="M6 6a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2h5.133L21.82 18.496A4 4 0 0 1 17.85 22H6.149a4 4 0 0 1-3.969-3.504L.867 8H6V6zm6 2a1 1 0 0 1 0 2H3.133l1.03 8.248A2 2 0 0 0 6.149 20h11.704a2 2 0 0 0 1.984-1.752L20.867 10H16V6a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2h4z"></path>
          </svg>
        </a>
        {addBurger()}
        <a className={styles.burger} onClick={onBurgerMenuOpen}>
          <img src="img/burger.svg" alt="Бургер меню" />
        </a>
      </div>
    </header>
  )
};

export default Header;
