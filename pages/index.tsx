import { useEffect, useState } from 'react';

import Header from '../src/components/Header/Header';
import Footer from '../src/components/Footer/Footer';
import Main from '../src/components/Main/Main';
import { GoodsModel } from '../src/modules/GoodsModel';
import { IFilters, IGood } from '../src/frontendTypes';
import Cart from '../src/components/Cart/Cart';

import styles from  '../src/styles/Home.module.scss';

export async function getStaticProps() {
  const fetchData = async (filters: Partial<IFilters>) => {
    const url: string = 'http://localhost:4333/goods';

    const response = await fetch(url,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: JSON.stringify(filters),
      },
    );

    if (typeof response === 'undefined') throw new Error('got undefined from backend');

    const goods = await response.json();
    
    if (typeof goods === 'undefined') throw new Error('got bad response from backend');
    
    goods.forEach((good: IGood) => {
      if (typeof good === 'undefined') throw new Error('got bad response from backend');
    });

    return goods;
  };

  const goods = await fetchData({});

  const props = {
    goods,
  }

  return {
    props,
  }
}

function Home (props: any) {
  console.log('props: ', props);

  const [cartState, setCartState] = useState<Array<IGood>>([]);

  const staticGoodsState = props.goods;

  const [goodsState, setGoodsState] = useState<Array<IGood>>(staticGoodsState);

  const onCartAdd = (good: IGood) => {
    setCartState((lastState) => {
      return [...lastState, good];
    });
  };

  const onCartItemDelete = (good: IGood) => {
    setCartState(lastState => (
      [...lastState].filter((item) => (
        item !== good
      ))
    ));
  };

  const [cartVisibility, setCartVisibility] = useState(false);

  const onCartOpen = () => {
    setCartVisibility(true);
  };

  const onCartClose = () => {
    setCartVisibility(false);
  };

  const renderCart = () => {
    if (cartVisibility) {

      return (
        <Cart 
          goods={cartState}
          cartVisibility={cartVisibility}
          onItemDelete={onCartItemDelete}
          onCartClose={onCartClose}
          onCartOpen={onCartOpen}
        />
      )
    }
  };

  const [optionsState, setOptionsState] = useState<Partial<IFilters>>({});

  useEffect(() => {
    const fetchData = async (filters: Partial<IFilters>) => {
      const url: string = 'http://localhost:4333/goods';

      const response = await fetch(url,
        {
          method: 'POST',
          headers: {
            // 'Content-Type': 'application/json'
            'Content-Type': 'text/plain',
          },
          body: JSON.stringify(filters),
        },
      );

      if (typeof response === 'undefined') throw new Error('got undefined from backend');
      
      const goods = await response.json();
      
      if (typeof goods === 'undefined') throw new Error('got bad response from backend');
      
      goods.forEach((good: IGood) => {
        if (typeof good === 'undefined') throw new Error('got bad response from backend');
      });

      return goods;
    };

    fetchData(optionsState).then((goods) => {
      setGoodsState(goods);
    });
  }, [optionsState]);
  
  return (
    <>
      {/* <Head>
        
      </Head> */}

      {renderCart()}

      <Header cartState={cartState} onCartOpen={onCartOpen} />

      {/* <Main onChange={handleFiltersChange} /> */}
      <Main
        onCartAdd={onCartAdd}
        goods={goodsState}
      />

      <Footer />
    </>
  );
};

export default Home;
