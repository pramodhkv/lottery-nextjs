import React from "react";
import { PropagateLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="bg-body h-screen flex flex-col items-center justify-center space-x-2">
      <div className="flex items-center justify-center space-x-2 mb-10">
        <img
          src="/images/avatar.png"
          alt="Avatar"
          className="rounded-full h-20 w-20"
        />
        <h1 className="text-lg text-white font-bold">Loading the lucky draw</h1>
      </div>
      <PropagateLoader color="#00BFFF" size={30} />
    </div>
  );
};

export default Loader;
