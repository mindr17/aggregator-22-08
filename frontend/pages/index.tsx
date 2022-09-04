import type { NextPage } from 'next';
import styles from '../src/styles/pages-styles/Home.module.scss';
import Auth from '../src/components/Auth/Auth';
import Info from '../src/components/Info/Info';
import { useContext } from 'react';
import AuthContext from '../src/context/AuthContext';

const Home: NextPage = () => {
  const auth = useContext(AuthContext);

  return <div className={styles.wrapper}>{auth.isShowForm ? <Auth /> : <Info />}</div>;
};

export default Home;
