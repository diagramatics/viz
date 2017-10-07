export default ({ mouseIdle, children }) => (
  <div className={mouseIdle ? 'hide-mouse' : ''}>
    {children}
    <style jsx>{`
      .hide-mouse {
        cursor: none;
      }
    `}</style>
  </div>
);
