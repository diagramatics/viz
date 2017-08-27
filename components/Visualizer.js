import * as d3 from 'd3';
import { Component } from 'react';
import Spectrum from '../lib/Spectrum';

export default class Visualizer extends Component {
  render() {
    return (
      <svg className="canvas" ref={(svg) => this.svg = svg}>
        <path
          id="waveformPath"
          style={{
            fill: 'none',
            strokeWidth: 1,
            stroke: 'black'
          }}
        />
      </svg>
    );
  }

  componentDidMount() {
    const sensitivity = 1; // min 1
    const topRange = 500; // max 0
    const bottomRange = -10;

    function aggregate(data, bars) {
      const aggregated = new Float32Array(bars);

      for(let i = 0; i < bars; i++) {
        const lowerBound = Math.floor(i / bars * data.length);
        const upperBound = Math.floor((i + 1) / bars * data.length);
        const bucket = data.slice(lowerBound, upperBound);

        aggregated[i] = bucket.reduce((acc, d) => acc + d, 0) / bucket.length * sensitivity;

        if (!Number.isFinite(aggregated[i])) {
          aggregated[i] = bottomRange;
        }
      }

      return aggregated;
    }

    const width = window.innerWidth;
    const height = window.innerHeight;


    navigator.mediaDevices.getUserMedia({ audio: true, video: false })
      .then((mediaStream) => {
        // const bars = Math.floor(width / 30);
        const bars = 90;
        const context = new AudioContext();
        const source = context.createMediaStreamSource(mediaStream);

        const analyser = context.createAnalyser();
        analyser.fftSize = 4096;
        source.connect(analyser);
        const selector = d3.select(this.svg);

        selector.selectAll('rect').remove();

        selector.attr('width', width);
        selector.attr('height', height);

        selector.append('rect')
          .attr('class', 'background')
          .attr('x', 0)
          .attr('y', 0)
          .attr('width', width)
          .attr('height', height);

        selector.attr("style", "transform-origin: " + (width / 2) + "px " + (height / 2) + "px; transform: scaleY(-1);");

        const spectrum = new Spectrum();

        const visualize = function () {
          // let waveformData = new Float32Array(analyser.frequencyBinCount);
          let waveformData = new Uint8Array(analyser.frequencyBinCount);
          analyser.getByteFrequencyData(waveformData);
          // waveformData = aggregate(waveformData, bars);
          waveformData = spectrum.GetVisualBins(waveformData, bars, 0, 1000);

          const xScale = d3.scaleLinear()
            .range([0, width])
            .domain([0, bars]);

          const yScale = d3.scaleLinear()
            .range([height, 0])
            .domain([topRange, bottomRange]);

          const rect = selector.selectAll('rect.frequency-bar')
            .data(waveformData);

          rect.enter()
            .append('rect')
            .attr('x', function(d, i) {
              return xScale(i) * 1.1;
            })
            .attr('width', function() {
              return width / bars;
              // return 20;
            })
            .attr('height', 1)
            // .attr('rx', 8)
            // .attr('ry', 8)
            .attr('y', -4)
            .attr('class', 'frequency-bar');

          // rect.attr('height', (d) => Math.max(1, yScale(d)));
          rect.attr('style', (d) => `transform: scaleY(${-Math.max(1, yScale(d))})`)


          requestAnimationFrame(visualize);
        }

        visualize();
      });
  }
}