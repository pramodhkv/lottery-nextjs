import { useMetamask } from "@thirdweb-dev/react";
import React from "react";
import CustomButton from "../CustomButton";

const Login = () => {
  const connectWithMetaMask = useMetamask();
  return (
    <div className="bg-body min-h-screen flex flex-col items-center justify-center text-center text-white p-3">
      <div className="border-2 border-emerald-800 shadow-xl rounded-lg w-full md:w-1/2 container mx-auto p-2 h-96 flex flex-col justify-center">
        <h1 className="text-5xl md:text-6xl font-bold mt-5 bg-clip-text bg-gradient-to-r from-orange-500 to-emerald-500 text-transparent">
          Lucky Draw
        </h1>
        <h2 className="text-lg my-5">Get Started by using Metamask</h2>

        <div className="container mx-auto">
          <CustomButton
            isActive
            text="Connect with Metamask"
            onClick={connectWithMetaMask}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
