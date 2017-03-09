function aggregate(data, bars) {
  const aggregated = new Float32Array(bars);

  for(let i = 0; i < bars; i++) {
    const lowerBound = Math.floor(i / bars * data.length);
    const upperBound = Math.floor((i + 1) / bars * data.length);
    const bucket = data.slice(lowerBound, upperBound);

    aggregated[i] = bucket.reduce((acc, d) => acc + d, 0) / bucket.length;
  }

  return aggregated;
}

const width = window.innerWidth;
const height = window.innerHeight;


navigator.mediaDevices.getUserMedia({ audio: true, video: false })
  .then((mediaStream) => {
    const bars = Math.floor(width / 30);
    const context = new AudioContext();
    const source = context.createMediaStreamSource(mediaStream);

    const analyser = context.createAnalyser();
    // analyser.fftSize = 2048;
    source.connect(analyser);
    // analyser.connect(context.destination);
    //
    const selector = d3.select('#svg');

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


    const visualize = function () {
      let waveformData = new Float32Array(analyser.frequencyBinCount);
      analyser.getFloatFrequencyData(waveformData);
      waveformData = aggregate(waveformData, bars);

      const xScale = d3.scaleLinear()
        .range([0, width])
        .domain([0, bars]);

      const yScale = d3.scaleLinear()
        .range([height, 0])
        .domain([0, -128]);

      // const line = d3.line()
      //   .x(function(d, i) { return xScale(i); })
      //   .y(function(d, i) { return yScale(d); });

      const rect = selector.selectAll('rect.frequency-bar')
        .data(waveformData);

      rect
        // .select('#waveformPath')
        .enter()
        .append('rect')
        .attr('x', function(d, i) {
          return xScale(i) * 1.05;
        })
        .attr('width', function() {
          return width / bars;
        })
        .attr('rx', 8)
        .attr('ry', 8)
        .attr('y', -4)
        .attr('class', 'frequency-bar');
        // .datum(waveformData)
        // .attr('d', line);

      rect.attr('height', (d) => Math.max(1, yScale(d)));


      requestAnimationFrame(visualize);
    }

    visualize();
  });
