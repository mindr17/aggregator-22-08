import styles from './Main.module.scss';
import Image from 'next/image';
import cls from 'classnames';
import { GoodsModel } from '../../modules/GoodsModel';
import Card from './Card/Card';
import { useState } from 'react';
import Filters from './Filters/Filters';
import { IGood } from '../../frontendTypes';
import { IMainProps } from './IMain';

const Main = (props: IMainProps) => {

  return (
    <main className={styles.main} id="main">
      <Filters />

      <div className={styles.main__goods}>
        {
          props.goods.map((good) => {
            return <Card key={good.name} onToggleCart={() => {props.onCartAdd(good)}} goodData={good}/>
          })
        }
      </div>
    </main>
  );
}

export default Main;
