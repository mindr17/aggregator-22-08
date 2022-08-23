import '../src/styles/global.scss';
import '../src/styles/normalize.scss';
import type { AppProps } from 'next/app';
import Layout from '../src/components/Layout/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
