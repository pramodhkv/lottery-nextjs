import { useContractRead } from "@thirdweb-dev/react";
import { SmartContract } from "@thirdweb-dev/sdk";
import { ethers } from "ethers";
import React from "react";
import { currency } from "../../constants";
import CountdownTimer from "../CountdownTimer";

interface INextDrawBoxProps {
  contract: SmartContract<ethers.BaseContract> | undefined;
  remainingTickets: string;
}

const NextDrawBox = (props: INextDrawBoxProps) => {
  const { contract, remainingTickets } = props;

  const { data: currentWinningReward } = useContractRead(
    contract,
    "CurrentWinningReward"
  );

  return (
    <div className="border-2 border-emerald-800 shadow-xl rounded-lg w-full flex flex-col items-center justify-center flex-1 p-2">
      <h1 className="text-2xl md:text-5xl font-bold text-center bg-clip-text bg-gradient-to-r from-orange-500 to-emerald-500 text-transparent mt-2">
        The Next Draw
      </h1>

      <div className="flex gap-4 my-5 md:p-5 w-full">
        <div className="border border-emerald-800 rounded-lg p-3 flex-1">
          <h1 className="text-sm">Total Pool</h1>
          <p>
            {currentWinningReward &&
              ethers.utils.formatEther(currentWinningReward.toString())}{" "}
            {currency}
          </p>
        </div>

        <div className="border border-emerald-800 rounded-lg p-3 flex-1">
          <h1 className="text-sm">Tickets Remaining</h1>
          <p>{remainingTickets?.toString()}</p>
        </div>
      </div>

      <CountdownTimer />
    </div>
  );
};

export default NextDrawBox;
