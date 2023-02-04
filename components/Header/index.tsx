import React from "react";
import CustomButton from "../CustomButton";
import { useAddress, useDisconnect } from "@thirdweb-dev/react";

const Header = () => {
  const address = useAddress();
  const disconnect = useDisconnect();

  return (
    <div className="Header flex items-center justify-between p-5">
      <div className="flex items-center space-x-2">
        <img
          src="../../images/avatar.png"
          alt="Avatar"
          className="rounded-full h-20 w-20"
        />

        <div>
          <h1 className="text-xl md:text-2xl font-extrabold my-2 bg-clip-text bg-gradient-to-r from-orange-500 to-emerald-500 text-transparent">
            Lucky Draw
          </h1>
          <p className="text-sm md:text-md text-emerald-500 truncate">
            user: {address?.substring(0, 5)}...
            {address?.substring(address.length - 5)}
          </p>
        </div>
      </div>

      <CustomButton isActive text="Logout" onClick={disconnect} />
    </div>
  );
};

export default Header;
