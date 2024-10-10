import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  if (!isBrowser) return null;

  return createPortal(
    <>
      {/* Modal Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 backdrop-blur transition-opacity duration-300 z-40 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Modal Content */}
      <div
        className={`fixed inset-0 flex items-start justify-center p-2 transition-transform duration-300 z-50 overflow-y-auto ${
          isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="bg-neutral-50 dark:bg-neutral-950 w-full max-w-lg mx-auto pt-6 pb-20 px-2 rounded-lg shadow-lg relative transform transition-all"
        >
          {/* Close Button */}
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
            onClick={onClose}
          >
            &times;
          </button>

          {/* Modal Content */}
          {children}
        </div>
      </div>
    </>,
    document.getElementById('modal-root') as HTMLElement
  );
};

export default Modal;
