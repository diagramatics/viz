import React, { Component } from 'react';
import * as d3 from 'd3';
import spectrum from '../lib/Spectrum';

export default class Visualizer extends Component {
  static defaultProps = {
    bars: 96,
    topRange: 500,
    bottomRange: 1,
  };

  getWindowDimensions() {
    return {
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
    };
  }

  getScales(bars, windowWidth, windowHeight, topRange, bottomRange) {
    return {
      xScale: d3.scaleLinear().range([0, windowWidth]).domain([0, bars]),
      yScale: d3
        .scaleLinear()
        .range([windowHeight, 0])
        .domain([topRange, bottomRange]),
    };
  }

  getBarsHorizontalPositions(bars, xScale) {
    return Array(bars).fill(1).map((val, index) => xScale(index) * 1.1);
  }

  updateBarsHeight(waveformData) {
    this.setState({
      barsHeight: Array(this.props.bars)
        .fill(1)
        .map((val, index) => this.state.yScale(waveformData[index]))
        .map(val => Math.max(0, val)),
    });
  }

  updateDimensions() {
    const windowDimensions = this.getWindowDimensions();
    const scales = this.getScales(
      this.props.bars,
      windowDimensions.windowWidth,
      windowDimensions.windowHeight,
      this.props.topRange,
      this.props.bottomRange,
    );
    const barsHorizontalPositions = this.getBarsHorizontalPositions(
      this.props.bars,
      scales.xScale,
    );

    this.setState({
      ...windowDimensions,
      ...scales,
      barsHorizontalPositions,
    });
  }

  constructor(props) {
    super(props);
    this.updateDimensions = this.updateDimensions.bind(this);
    this.getScales = this.getScales.bind(this);
    this.getWindowDimensions = this.getWindowDimensions.bind(this);
    this.getBarsHorizontalPositions = this.getBarsHorizontalPositions.bind(
      this,
    );
    this.updateBarsHeight = this.updateBarsHeight.bind(this);

    this.state = {
      windowWidth: 0,
      windowHeight: 0,
      barsHorizontalPositions: [],
      barsHeight: [],
      xScale: () => {},
      yScale: () => {},
    };
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  componentDidMount() {
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

        const visualize = () => {
          const waveformData = new Uint8Array(analyser.frequencyBinCount);
          analyser.getByteFrequencyData(waveformData);

          this.updateBarsHeight(
            spectrum.GetVisualBins(waveformData, this.props.bars, 0, 1024),
          );

          requestAnimationFrame(visualize);
        };

        visualize();
      });
  }

  render() {
    return (
      <svg
        className="canvas"
        ref={svg => {
          this.svg = svg;
        }}
        style={{
          transformOrigin: `${this.state.windowWidth / 2}px ${this.state
            .windowHeight / 2}px`,
          transform: `scaleY(-1)`,
        }}
        width={this.state.windowWidth}
        height={this.state.windowHeight}
      >
        <rect
          className="background"
          x="0"
          y="0"
          width={this.state.windowWidth}
          height={this.state.windowHeight}
        />
        <g>
          {this.state.barsHorizontalPositions.map((value, index) =>
            <rect
              key={index}
              x={value}
              width={this.state.windowWidth / this.props.bars}
              className="frequency-bar"
              height="1"
              style={{
                transform: `scaleY(${-this.state.barsHeight[index]})`,
              }}
            />,
          )}
        </g>
      </svg>
    );
  }
}