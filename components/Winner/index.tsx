import { ethers } from "ethers";
import React from "react";
import { currency } from "../../constants";

interface IWinnerProps {
  winningAmount: string;
  onWithdrawWinning: () => unknown;
}

const Winner = (props: IWinnerProps) => {
  const { winningAmount, onWithdrawWinning } = props;

  return (
    <div className="flex justify-center w-full">
      <div className="max-w-lg bg-gradient-to-r from-orange-500 to-emerald-500 p-5 text-center my-5 m-5 rounded-lg">
        <h1 className="text-2xl md:text-4xl animate-pulse">
          Yaaaayyyy ! You have won {ethers.utils.formatEther(winningAmount)}{" "}
          {currency}
        </h1>

        <button
          className="bg-emerald-800 text-white p-5 rounded-lg mt-5 animate-pulse"
          onClick={onWithdrawWinning}
        >
          Click here to Withdraw
        </button>
      </div>
    </div>
  );
};

export default Winner;
