import React, { useEffect, useState } from 'react';
import { IGood } from '../../frontendTypes';
import styles from './Cart.module.scss';

interface ICartProps {
  goods: Array<IGood>;
  cartVisibility: boolean;
  onItemDelete: (good: IGood) => void;
  onCartClose: () => void;
  onCartOpen: () => void;
}

const Cart = (props: ICartProps) => {
  useEffect(() => {
    console.log('open');

    return function cleanup() {
        console.log('closed');
      };
    }, []
  );

  return (
    <>
      <div className={styles.cart__background} onClick={props.onCartClose}>
      </div>
      <div className={styles.cart__modal}>
        {
          props.goods.map(item => {
              const testKey = Math.random();

              return (
                <div key={testKey} className={styles.row}>
                  item.name
                </div>
              )
            }
          )
        }
      </div>
    </>
  )
};

export default Cart;
