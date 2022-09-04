import type { NextPage } from 'next';
import styles from '../src/styles/pages/Home.module.scss';
import Auth from '../src/components/Auth/Auth';
import Info from '../src/components/Info/Info';
import { useContext } from 'react';
import AuthContext from '../src/context/AuthContext';
import Link from 'next/link';

const Home: NextPage = () => {
  const auth = useContext(AuthContext);

  return (
    <div className={styles.wrapper}>{auth.isShowForm ? <Auth /> : <Info />}</div>
  )
};

export default Home;
