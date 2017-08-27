import Head from 'next/head'
import stylesNormalize from '../styles/normalize';
import stylesGlobal from '../styles/global';
import Visualizer from '../components/Visualizer';

export default () => (
  <div>
    <Head>
      <meta charSet="UTF-8" />
      <title>Visualiser</title>
    </Head>
    <style jsx global>{stylesNormalize}</style>
    <style jsx global>{stylesGlobal}</style>

    <Visualizer />
  </div>
);