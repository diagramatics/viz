import * as d3 from 'd3';
import PropTypes from 'prop-types';
import React from 'react';
import memoizeOne from 'memoize-one';
import Bar from './Bar';
import Canvas from './Canvas';
import FlippedContainer from './FlippedContainer';
import Background from './Background';

export default class Visualizer extends React.PureComponent {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.number).isRequired,
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

  getBarsHeight = waveformData => {
    const { bars, height, topRange, bottomRange } = this.props;
    return Array(bars)
      .fill(1)
      .map((val, index) =>
        this.getYScale(height, topRange, bottomRange)(waveformData[index]),
      )
      .map(val => Math.max(0, val));
  };

  render() {
    const { background, bars, width, height, data } = this.props;

    const barsHorizontalPositions = this.getBarsHorizontalPositions(
      bars,
      width,
    );

    const barsHeight = this.getBarsHeight(data);

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
