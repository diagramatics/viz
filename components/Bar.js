export default ({ x, width, height }) =>
  <rect
    x={x}
    width={width}
    height="1"
    style={{
      transform: `scaleY(${height})`,
    }}
    className="frequency-bar"
  >
    <style jsx>{`
      .frequency-bar {
        fill: rgba(248, 249, 250, 0.8);
      }
    `}</style>
  </rect>;
