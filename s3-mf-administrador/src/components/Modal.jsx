const Modal = ({ onClose, children }) => {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded shadow-md relative">
          <button onClick={onClose} className="absolute top-0 right-0 p-2">
            X
          </button>
          {children}
        </div>
      </div>
    );
  };
  
  export default Modal;
  