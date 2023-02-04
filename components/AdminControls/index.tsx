import React from "react";
import {
  StarIcon,
  CurrencyDollarIcon,
  ArrowPathIcon,
  ArrowUturnDownIcon,
} from "@heroicons/react/24/solid";
import {
  useAddress,
  useContract,
  useContractRead,
  useContractWrite,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { currency } from "../../constants";
import toast from "react-hot-toast";

const AdminControls = () => {
  const { contract } = useContract(
    process.env.NEXT_PUBLIC_LOTTERY_CONTRACT_ADDRESS
  );
  const { data: operatorTotalCommission } = useContractRead(
    contract,
    "operatorTotalCommission"
  );
  const { mutateAsync: DrawWinnerTicket } = useContractWrite(
    contract,
    "DrawWinnerTicket"
  );
  const { mutateAsync: WithdrawCommission } = useContractWrite(
    contract,
    "WithdrawCommission"
  );
  const { mutateAsync: restartDraw } = useContractWrite(
    contract,
    "restartDraw"
  );
  const { mutateAsync: RefundAll } = useContractWrite(contract, "RefundAll");

  const handleDrawWinner = async () => {
    const notification = toast.loading("Drawing winner...");
    try {
      const tx = await DrawWinnerTicket([]);
      toast.success("Winner drawn!", {
        id: notification,
      });
    } catch (error) {
      toast.error("Error drawing winner", {
        id: notification,
      });
      console.error(error);
    }
  };

  const handleWithdrawCommission = async () => {
    const notification = toast.loading("Withdrawing commission...");
    try {
      const tx = await WithdrawCommission([]);
      toast.success("Commission withdrawn!", {
        id: notification,
      });
    } catch (error) {
      toast.error("Error withdrawing commission", {
        id: notification,
      });
      console.error(error);
    }
  };

  const handleRestartDraw = async () => {
    const notification = toast.loading("Restarting draw...");
    try {
      const tx = await restartDraw([]);
      toast.success("Draw restarted!", {
        id: notification,
      });
    } catch (error) {
      toast.error("Error restarting draw", {
        id: notification,
      });
      console.error(error);
    }
  };

  const handleRefundAll = async () => {
    const notification = toast.loading("Refunding all tickets...");
    try {
      const tx = await RefundAll([]);
      toast.success("All tickets refunded!", {
        id: notification,
      });
    } catch (error) {
      toast.error("Error refunding all tickets", {
        id: notification,
      });
      console.error(error);
    }
  };

  return (
    <div className="border-2 border-emerald-800 rounded-lg p-5 w-full">
      <h1 className="font-bold text-xl">Admin Controls</h1>
      <p className="my-2">
        Commission to be withdrawn:{" "}
        <span className="text-emerald-300 font-bold italic">
          {operatorTotalCommission &&
            ethers.utils.formatEther(operatorTotalCommission?.toString())}{" "}
          {currency}
        </span>
      </p>

      <div className="flex flex-col gap-2 md:flex-row my-5">
        <button className="admin-btn" onClick={handleDrawWinner}>
          <StarIcon className="h-6 w-6 mx-auto mb-2" />
          Draw Winner
        </button>

        <button className="admin-btn" onClick={handleWithdrawCommission}>
          <CurrencyDollarIcon className="h-6 w-6 mx-auto mb-2" />
          Withdraw Commission
        </button>

        <button className="admin-btn" onClick={handleRestartDraw}>
          <ArrowPathIcon className="h-6 w-6 mx-auto mb-2" />
          Restart Draw
        </button>

        <button className="admin-btn" onClick={handleRefundAll}>
          <ArrowUturnDownIcon className="h-6 w-6 mx-auto mb-2" />
          Refund All
        </button>
      </div>
    </div>
  );
};

export default AdminControls;
