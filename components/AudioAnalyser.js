import React from 'react';
import PropTypes from 'prop-types';
import rafSchedule from 'raf-schd';
import spectrum from '../lib/Spectrum';

class AudioAnalyser extends React.PureComponent {
  stopVisualize = false;

  bars = 96;

  frameId = undefined;

  static propTypes = {
    children: PropTypes.func,
  };

  static defaultProps = {
    children: () => undefined,
  };

  state = {
    waveformData: [],
  };

  async componentDidMount() {
    const mediaStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
    });

    const { createMediaStreamSource, createAnalyser } = new AudioContext();
    const source = createMediaStreamSource(mediaStream);

    const analyser = createAnalyser();
    analyser.fftSize = 4096;
    source.connect(analyser);

    const waveformData = new Uint8Array(analyser.frequencyBinCount);

    const visualizeLoop = rafSchedule(() => {
      if (this.stopVisualize) {
        return;
      }
      analyser.getByteFrequencyData(waveformData);

      this.setState({
        waveformData: spectrum.GetVisualBins(waveformData, this.bars, 0, 1024),
      });

      this.frameId = visualizeLoop();
    });
    this.frameId = visualizeLoop();
  }

  componentWillUnmount() {
    this.stopVisualize = true;
  }

  render() {
    const { children } = this.props;
    const { waveformData } = this.state;

    return children({ data: waveformData });
  }
}

export default AudioAnalyser;
