export default ({ x, width, height }) =>
  <rect
    x={x}
    width={width}
    height="1"
    style={{
      transform: `scaleY(${-height})`,
    }}
    className="frequency-bar"
  />;
