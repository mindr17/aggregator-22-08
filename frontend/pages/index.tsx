import type { NextPage } from 'next';
import Auth from '../src/components/Auth/Auth';

const Home: NextPage = () => {
  return (
    <>
      <h1>Home</h1>
      <Auth />
    </>
  )
};

export default Home;
