import * as d3 from 'd3';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import rafSchedule from 'raf-schd';
import Bar from './Bar';
import Canvas from './Canvas';
import FlippedContainer from './FlippedContainer';
import Background from './Background';
import spectrum from '../lib/Spectrum';

export default class Visualizer extends Component {
  static propTypes = {
    bars: PropTypes.number,
    topRange: PropTypes.number,
    bottomRange: PropTypes.number,
    background: PropTypes.string.isRequired,
  };

  static defaultProps = {
    bars: 96,
    topRange: 500,
    bottomRange: 1,
  };

  state = {
    windowWidth: 0,
    windowHeight: 0,
    barsHorizontalPositions: [],
    barsHeight: [],
    yScale: () => {},
  };

  componentDidMount() {
    const { bars } = this.props;

    window.addEventListener('resize', this.updateDimensions);
    this.updateDimensions();

    navigator.mediaDevices
      .getUserMedia({ audio: true, video: false })
      .then(mediaStream => {
        const context = new AudioContext();
        const source = context.createMediaStreamSource(mediaStream);

        const analyser = context.createAnalyser();
        analyser.fftSize = 4096;
        source.connect(analyser);

        const visualizeLoop = rafSchedule(() => {
          if (this.stopVisualize) {
            return;
          }
          const waveformData = new Uint8Array(analyser.frequencyBinCount);
          analyser.getByteFrequencyData(waveformData);

          this.updateBarsHeight(
            spectrum.GetVisualBins(waveformData, bars, 0, 1024),
          );

          this.frameId = visualizeLoop();
        });
        this.frameId = visualizeLoop();
      });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
    this.stopVisualize = true;
  }

  getWindowDimensions = () => ({
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight,
  });

  getScales = (bars, windowWidth, windowHeight, topRange, bottomRange) => ({
    xScale: d3
      .scaleLinear()
      .range([0, windowWidth])
      .domain([0, bars]),
    yScale: d3
      .scaleLinear()
      .range([windowHeight, 0])
      .domain([topRange, bottomRange]),
  });

  getBarsHorizontalPositions = (bars, xScale) =>
    Array(bars)
      .fill(1)
      .map((val, index) => xScale(index) * 1.1);

  updateBarsHeight = waveformData => {
    const { bars } = this.props;
    const { yScale } = this.state;
    this.setState({
      barsHeight: Array(bars)
        .fill(1)
        .map((val, index) => yScale(waveformData[index]))
        .map(val => Math.max(0, val)),
    });
  };

  updateDimensions = () => {
    const { bars, topRange, bottomRange } = this.props;
    const windowDimensions = this.getWindowDimensions();
    const scales = this.getScales(
      bars,
      windowDimensions.windowWidth,
      windowDimensions.windowHeight,
      topRange,
      bottomRange,
    );
    const barsHorizontalPositions = this.getBarsHorizontalPositions(
      bars,
      scales.xScale,
    );

    this.setState({
      ...windowDimensions,
      ...scales,
      barsHorizontalPositions,
    });
  };

  render() {
    const {
      windowWidth,
      windowHeight,
      barsHorizontalPositions,
      barsHeight,
    } = this.state;

    const { background, bars } = this.props;
    return (
      <Canvas width={windowWidth} height={windowHeight}>
        <Background
          width={windowWidth}
          height={windowHeight}
          background={background}
        />
        <FlippedContainer width={windowWidth} height={windowHeight}>
          {barsHorizontalPositions.map((value, index) => (
            <Bar
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              x={value}
              width={windowWidth / bars}
              height={barsHeight[index]}
            />
          ))}
        </FlippedContainer>
      </Canvas>
    );
  }
}
