import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { connect } from 'react-redux';
import stylesNormalize from '../styles/normalize';
import stylesGlobal from '../styles/global';
import Visualizer from '../components/Visualizer';
import MouseIdle from '../components/MouseIdle';
import MouseHide from '../components/MouseHide';
import FullContainer from '../components/FullContainer';
import SettingsToolbar from '../components/SettingsToolbar';
import WindowMeasure from '../components/WindowMeasure';

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
        <WindowMeasure>
          {({ width, height }) => (
            <Visualizer background={background} width={width} height={height} />
          )}
        </WindowMeasure>
        <MouseIdle Idle={SettingsToolbar} active={mouseIdleActive} />
      </FullContainer>
    </MouseIdle>
  </div>
);

Home.propTypes = {
  mouseIdleActive: PropTypes.bool.isRequired,
  background: PropTypes.string.isRequired,
};

export default connect(({ mouseIdleActive, background }) => ({
  mouseIdleActive,
  background,
}))(Home);
