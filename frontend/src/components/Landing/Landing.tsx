import type { NextPage } from 'next';
import styles from './Landing/Landing.module.scss';
import Link from 'next/link';

const Landing: NextPage = () => {
  // const auth = useContext(AuthContext);

  // return <div className={styles.wrapper}>{auth.isShowForm ? <Auth /> : <Info />}</div>;

  return (
    <div>
      <Link href={'./news'}>News</Link>
    </div>
  )
};

export default Landing;
