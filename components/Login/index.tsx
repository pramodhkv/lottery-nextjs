import { useMetamask } from "@thirdweb-dev/react";
import React from "react";
import CustomButton from "../CustomButton";

const Login = () => {
  const connectWithMetaMask = useMetamask();
  return (
    <div className="bg-lotteryLogin bg-no-repeat bg-cover bg-center min-h-screen flex flex-col items-center justify-center text-center text-white p-3">
      <div className="flex flex-col justify-center items-center mb-10 rounded-lg w-full md:w-1/3 h-96 bg-emerald-900/60">
        <h1 className="text-5xl font-bold mt-5">Lucky Draw</h1>
        <h2 className="text-lg my-5">Get Started by using Metamask</h2>

        <CustomButton
          isActive
          text="Connect with Metamask"
          onClick={connectWithMetaMask}
        />
      </div>
    </div>
  );
};

export default Login;
