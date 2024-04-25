import React from "react";
import { IoMdClose } from "react-icons/io";
interface ModalProps {
  show: boolean;
  closeModal: () => void;
}

const OurFarm: React.FC<ModalProps> = ({ show, closeModal }) => {
  return (
    <>
      {show && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-8 w-[1300px] h-[650px] relative">
            <button
              className="absolute top-0 right-0 mt-2 mr-2"
              onClick={closeModal}
            >
              <IoMdClose size={30} />
            </button>
            <h2 className="text-3xl font-bold mb-4 text-center">Our Farm</h2>
            <h2 className="text-xl text-center mb-4">Happy Cow</h2>
            <div className="w-[700px] mx-auto text-center">
              <span className="text-gray-600 text-base">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur.
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OurFarm;
