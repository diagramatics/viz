import * as d3 from 'd3';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import rafSchedule from 'raf-schd';
import memoizeOne from 'memoize-one';
import Bar from './Bar';
import Canvas from './Canvas';
import FlippedContainer from './FlippedContainer';
import Background from './Background';
import spectrum from '../lib/Spectrum';

export default class Visualizer extends Component {
  static propTypes = {
    background: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    bars: PropTypes.number,
    topRange: PropTypes.number,
    bottomRange: PropTypes.number,
  };

  static defaultProps = {
    bars: 96,
    topRange: 500,
    bottomRange: 1,
  };

  state = {
    // eslint-disable-next-line react/destructuring-assignment
    barsHeight: Array(this.props.bars).fill(0),
  };

  componentDidMount() {
    const { bars } = this.props;

    navigator.mediaDevices
      .getUserMedia({ audio: true, video: false })
      .then(mediaStream => {
        const context = new AudioContext();
        const source = context.createMediaStreamSource(mediaStream);

        const analyser = context.createAnalyser();
        analyser.fftSize = 4096;
        source.connect(analyser);

        const waveformData = new Uint8Array(analyser.frequencyBinCount);

        const visualizeLoop = rafSchedule(() => {
          if (this.stopVisualize) {
            return;
          }
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
    this.stopVisualize = true;
  }

  getXScale = memoizeOne((width, bars) =>
    d3
      .scaleLinear()
      .range([0, width])
      .domain([0, bars]),
  );

  getYScale = memoizeOne((height, topRange, bottomRange) =>
    d3
      .scaleLinear()
      .range([height, 0])
      .domain([topRange, bottomRange]),
  );

  getBarsHorizontalPositions = memoizeOne((bars, width) =>
    Array(bars)
      .fill(1)
      .map((val, index) => this.getXScale(width, bars)(index) * 1.1),
  );

  updateBarsHeight = waveformData => {
    const { bars, height, topRange, bottomRange } = this.props;
    this.setState({
      barsHeight: Array(bars)
        .fill(1)
        .map((val, index) =>
          this.getYScale(height, topRange, bottomRange)(waveformData[index]),
        )
        .map(val => Math.max(0, val)),
    });
  };

  render() {
    const { background, bars, width, height } = this.props;
    const { barsHeight } = this.state;

    const barsHorizontalPositions = this.getBarsHorizontalPositions(
      bars,
      width,
    );

    return (
      <Canvas width={width} height={height}>
        <Background width={width} height={height} background={background} />
        <FlippedContainer width={width} height={height}>
          {barsHorizontalPositions.map((value, index) => (
            <Bar
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              x={value}
              width={width / bars}
              height={barsHeight[index]}
            />
          ))}
        </FlippedContainer>
      </Canvas>
    );
  }
}
