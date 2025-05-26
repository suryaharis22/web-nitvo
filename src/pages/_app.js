import ContextManager from '@/context/ContextManager';
import Layout from '@/layout';
import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <ContextManager>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ContextManager>
  );
}
