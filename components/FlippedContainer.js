export default ({ children, width, height }) =>
  <g
    style={{
      transformOrigin: `${width / 2}px ${height / 2}px`,
      transform: `scaleY(-1)`,
    }}
  >
    {children}
  </g>;
