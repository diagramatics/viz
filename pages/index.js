import React from 'react';
import Head from 'next/head';
import stylesNormalize from '../styles/normalize';
import stylesGlobal from '../styles/global';
import Visualizer from '../components/Visualizer';
import MouseIdle from '../components/MouseIdle';
import MouseHide from '../components/MouseHide';
import FullContainer from '../components/FullContainer';
import SettingsToolbar from '../components/SettingsToolbar';

export default () => (
  <div>
    <Head>
      <meta charSet="UTF-8" />
      <title>Visualiser</title>
    </Head>
    <style jsx global>{stylesNormalize}</style>
    <style jsx global>{stylesGlobal}</style>

    <MouseIdle Idle={MouseHide} >
      <FullContainer>
        <Visualizer />
        <MouseIdle Idle={SettingsToolbar} />
      </FullContainer>
    </MouseIdle>
  </div>
);
