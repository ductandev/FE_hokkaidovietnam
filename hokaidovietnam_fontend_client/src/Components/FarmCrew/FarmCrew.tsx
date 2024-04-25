import React from "react";
import { IoMdClose } from "react-icons/io";
import img1 from "../../assets/img_home/18.jpeg";
import img2 from "../../assets/img_home/19.jpeg";
import img3 from "../../assets/img_home/20.jpeg";
import img4 from "../../assets/img_home/21.jpeg";

interface ModalProps {
  show: boolean;
  closeModal: () => void;
}

const FarmCrew: React.FC<ModalProps> = ({ show, closeModal }) => {
  return (
    <>
      {show && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-8 mx-4 my-4 w-full max-w-[90%] max-h-[90%] lg:max-w-[1300px] lg:h-[650px] relative overflow-auto">
            <button
              className="absolute top-0 right-0 mt-2 mr-2"
              onClick={closeModal}
            >
              <IoMdClose size={30} />
            </button>
            <h2 className="text-3xl font-bold mb-4 text-center">Farm Crew</h2>
            <h2 className="text-xl text-center mb-4">Happy Cow</h2>
            <div className="mx-auto text-center">
              <span className="text-gray-600 text-base">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur.
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 mt-3 gap-5">
              <div className="relative overflow-hidden">
                <img
                  src={img1}
                  alt=""
                  className="w-full h-full object-cover transform scale-100 transition-transform duration-300 hover:scale-110"
                />
              </div>
              <div className="relative overflow-hidden">
                <img
                  src={img2}
                  alt=""
                  className="w-full h-full object-cover transform scale-100 transition-transform duration-300 hover:scale-110"
                />
              </div>
              <div className="relative overflow-hidden">
                <img
                  src={img3}
                  alt=""
                  className="w-full h-full object-cover transform scale-100 transition-transform duration-300 hover:scale-110"
                />
              </div>
              <div className="relative overflow-hidden">
                <img
                  src={img4}
                  alt=""
                  className="w-full h-full object-cover transform scale-100 transition-transform duration-300 hover:scale-110"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FarmCrew;
