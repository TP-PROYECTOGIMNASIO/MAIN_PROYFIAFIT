const Modal = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-lg p-6 relative" onClick={(e) => e.stopPropagation()}>
        <button className="absolute top-2 right-2 text-gray-500 font-bold text-xl" onClick={onClose}>
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
