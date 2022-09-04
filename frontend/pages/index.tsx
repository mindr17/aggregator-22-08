import type { NextPage } from 'next';
import styles from '../src/styles/pages-styles/Home.module.scss';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <div>
      <Link href={'./news'}>News</Link>
    </div>
  )
};

export default Home;
