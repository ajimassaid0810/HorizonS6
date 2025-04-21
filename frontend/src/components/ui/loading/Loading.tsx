import React from "react";
import Lottie from "lottie-react"; // atau 'react-lottie'
import loadingAnimation from "./lottie/loading.json"; // arahkan sesuai lokasi file json

interface LoadingModalProps {
    isOpen: boolean;
  }
  
  const LoadingModal: React.FC<LoadingModalProps> = ({ isOpen }) => {
    if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-20 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center">
        <div className="w-60 h-60">
          <Lottie animationData={loadingAnimation} loop={true} />
        </div>
        <p className="text-xl text-blue-600 font-semibold mt-4">Loading Landchain...</p>
      </div>
    </div>
  );
};

export default LoadingModal;
