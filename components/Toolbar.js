export default ({ children }) => (
  <div class="container">
    <div className="toolbar is-hidden">
      {children}
    </div>
    <style jsx>{`
      .toolbar {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding: 4px 16px;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 48px;
        background: rgba(255, 255, 255, 0.2);
        transition: all 0.2s ease-in-out;
      }

      .toolbar.is-hidden {
        transform: translateY(100%);
      }

      .container {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 48px;
        overflow-y: hidden;
      }
    `}</style>
  </div>
)