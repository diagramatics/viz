export default ({ children }) => (
  <div className="container">
    {children}
    <style jsx>{`
      .container {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        overflow: hidden;
      }
    `}</style>
  </div>
);