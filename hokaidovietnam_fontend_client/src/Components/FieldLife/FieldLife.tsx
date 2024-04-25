import React from "react";

interface ModalProps {
  show: boolean;
  closeModal: () => void;
}

const FieldLife: React.FC<ModalProps> = ({ show, closeModal }) => {
  return (
    <>
      {show && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-8 max-w-md">
            <h2 className="text-xl font-bold mb-4">Modal FieldLife Content</h2>
            <p>Hello</p>
            <button
              className="bg-gray-200 text-gray-800 px-4 py-2 mt-4"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default FieldLife;
