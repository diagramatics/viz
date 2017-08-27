export default `
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  .canvas {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .background {
    fill: #82c91e;
  }

  .frequency-bar {
    fill: rgba(248, 249, 250, 0.8);
    transform-origin: bottom center;
  }
`;