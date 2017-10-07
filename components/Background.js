export default ({ width, height, background = '#82c91e' }) =>
  <rect
    x="0"
    y="0"
    width={width}
    height={height}
    style={{
      fill: background,
    }}
  />