import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import withRedux from 'next-redux-wrapper';
import stylesNormalize from '../styles/normalize';
import stylesGlobal from '../styles/global';
import Visualizer from '../components/Visualizer';
import MouseIdle from '../components/MouseIdle';
import MouseHide from '../components/MouseHide';
import FullContainer from '../components/FullContainer';
import SettingsToolbar from '../components/SettingsToolbar';
import { initStore } from '../store';
import WindowMeasure from '../components/WindowMeasure';
import AudioAnalyser from '../components/AudioAnalyser';

const Home = ({ mouseIdleActive, background }) => (
  <div>
    <Head>
      <meta charSet="UTF-8" />
      <title>Visualiser</title>
    </Head>
    <style jsx global>
      {stylesNormalize}
    </style>
    <style jsx global>
      {stylesGlobal}
    </style>

    <MouseIdle Idle={MouseHide} active={mouseIdleActive}>
      <FullContainer>
        <AudioAnalyser>
          {({ data }) => (
            <WindowMeasure>
              {({ width, height }) => (
                <Visualizer
                  data={data}
                  background={background}
                  width={width}
                  height={height}
                />
              )}
            </WindowMeasure>
          )}
        </AudioAnalyser>
        <MouseIdle Idle={SettingsToolbar} active={mouseIdleActive} />
      </FullContainer>
    </MouseIdle>
  </div>
);

Home.propTypes = {
  mouseIdleActive: PropTypes.bool.isRequired,
  background: PropTypes.string.isRequired,
};

export default withRedux(initStore, ({ mouseIdleActive, background }) => ({
  mouseIdleActive,
  background,
}))(Home);
