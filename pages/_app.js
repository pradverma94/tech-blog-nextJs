import Head from 'next/head';
import { Analytics } from '@vercel/analytics/react';
import '../styles/globals.css';
import Layout from '../components/layout/layout';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <Component {...pageProps} />
      <Analytics/>
    </Layout>
  );
}

export default MyApp;
