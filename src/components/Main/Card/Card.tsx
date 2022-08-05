import styles from './Card.module.scss';
import cls from 'classnames';
import Image from 'next/image';
import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from 'react';
import { IGood } from '../../../frontendTypes';

const Card = (props: { onToggleCart: () => void; goodData: IGood }) => {
  const toggleCart = () => {
    props.onToggleCart();
  };

  return (
    <div className={styles.card} onClick={toggleCart}>
      <div className={styles.card__count}>{props.goodData.name}</div>
      <img className={styles.card__img} src={props.goodData.img} alt="картинка товара" />
      <div className={styles.card__count}></div>
      <div className={styles.card__year}></div>
      <div className={styles.card__manufacturer}></div>
      <div className={styles.card__color}></div>
      <div className={styles.card__type}></div>
      <div className={styles.card__status}></div>
    </div>
  );
}

export default Card;
