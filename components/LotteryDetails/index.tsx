import {
  useAddress,
  useContract,
  useContractRead,
  useContractWrite,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import React from "react";
import Marquee from "react-fast-marquee";
import { toast } from "react-hot-toast";
import { currency } from "../../constants";
import AdminControls from "../AdminControls";
import NextDrawBox from "../NextDrawBox";
import TicketDetailsBox from "../TicketDetailsBox";
import Winner from "../Winner";

const LotteryDetails = () => {
  const address = useAddress();
  const { contract } = useContract(
    process.env.NEXT_PUBLIC_LOTTERY_CONTRACT_ADDRESS
  );

  const { data: remainingTickets } = useContractRead(
    contract,
    "RemainingTickets"
  );

  const { data: winnings } = useContractRead(
    contract,
    "getWinningsForAddress",
    address
  );
  const { data: lastWinner } = useContractRead(contract, "lastWinner");
  const { data: lastWinningAmount } = useContractRead(
    contract,
    "lastWinnerAmount"
  );
  const { data: lotteryOperator } = useContractRead(
    contract,
    "lotteryOperator"
  );

  const { mutateAsync: WithdrawWinnings } = useContractWrite(
    contract,
    "WithdrawWinnings"
  );

  const handleWithdrawWinningsClick = async () => {
    if (!winnings) {
      return;
    }

    const notification = toast.loading("Withdrawing winnings...");

    try {
      const data = await WithdrawWinnings([]);

      toast.success("Winnings withdrawn", {
        id: notification,
      });

      console.log("success", data);
    } catch (error) {
      toast.error("Error withdrawing winnings", {
        id: notification,
      });

      console.error(error);
    }
  };

  return (
    <div className="container mx-auto">
      <Marquee gradient={false} speed={100} className=" mb-5 p-5">
        <div className="flex justify-center gap-2 w-full">
          <h4 className="font-bold">
            Last winner: {lastWinner?.toString()}...
          </h4>
          <h4 className="font-bold">
            Previous Winnings:{" "}
            {lastWinningAmount &&
              ethers.utils.formatEther(lastWinningAmount?.toString())}{" "}
            {currency}
            ...
          </h4>
        </div>
      </Marquee>

      {winnings > 0 && (
        <Winner
          winningAmount={winnings}
          onWithdrawWinning={handleWithdrawWinningsClick}
        />
      )}

      {lotteryOperator === address && (
        <div className="flex md:justify-center text-center m-5">
          <AdminControls />
        </div>
      )}

      <div className="m-5 flex flex-col md:flex-row gap-10 md:gap-4">
        <NextDrawBox contract={contract} remainingTickets={remainingTickets} />

        <TicketDetailsBox
          contract={contract}
          remainingTickets={remainingTickets}
        />
      </div>
    </div>
  );
};

export default LotteryDetails;
