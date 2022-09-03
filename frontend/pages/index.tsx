import type { NextPage } from 'next';
import styles from '../src/styles/pages-styles/Home.module.scss';
import Auth from '../src/components/Auth/Auth';
import Info from '../src/components/Info/Info';

const Home: NextPage = () => {
  const isShowForm = true;

  return <div className={styles.wrapper}>{isShowForm ? <Auth /> : <Info />}</div>;
};

export default Home;
