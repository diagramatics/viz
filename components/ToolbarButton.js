export default ({ children, ...props }) => (
  <button className="button" {...props}>
    {children}
    <style jsx>{`
      .button {
        background: none;
        border: 0;
        transition: all 0.2s ease-in-out;
        cursor: pointer;
        padding: 4px;
      }

      .button:hover {
        background: rgba(0, 0, 0, 0.2);
      }
    `}</style>
  </button>
)