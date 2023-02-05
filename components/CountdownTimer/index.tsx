import { useContract, useContractRead } from "@thirdweb-dev/react";
import React from "react";
import Countdown from "react-countdown";
import CountdownBox from "../CountdownBox";

type IRendererProps = {
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
};

const CountdownTimer = () => {
  const { contract } = useContract(
    process.env.NEXT_PUBLIC_LOTTERY_CONTRACT_ADDRESS
  );
  const { data: expiration } = useContractRead(contract, "expiration");

  const renderer = (props: IRendererProps) => {
    const { hours, minutes, seconds, completed } = props;

    if (completed) {
      return (
        <p className="mb-5 transition-all animate-bounce duration-400 text-center">
          Tickets sales are <b>CLOSED</b> for this draw.
        </p>
      );
    } else {
      return (
        <div className="w-full md:p-5 mb-5">
          <p className="mb-5 italic">Time Remaining:</p>

          <div className="flex justify-between gap-2 items-center">
            <CountdownBox value={hours} text="Hours" />
            <CountdownBox value={minutes} text="Minutes" />
            <CountdownBox value={seconds} text="Seconds" />
          </div>
        </div>
      );
    }
  };

  return (
    //  <div className="flex justify-between gap-2 items-center w-full">
    //    <div className="flex flex-col flex-1">
    //      <div className="bg-emerald-900 border border-none rounded-lg px-3 py-5">
    //        <h1 className="text-2xl text-center">0</h1>
    //      </div>
    //      <p className="text-sm text-center mt-2">Hours</p>
    //    </div>

    //    <div className="flex flex-col flex-1">
    //      <div className="bg-emerald-900 border border-none rounded-lg px-3 py-5">
    //        <h1 className="text-2xl text-center">0</h1>
    //      </div>
    //      <p className="text-sm text-center mt-2">Minutes</p>
    //    </div>

    //    <div className="flex flex-col flex-1">
    //      <div className="bg-emerald-900 border border-none rounded-lg px-3 py-5">
    //        <h1 className="text-2xl text-center">0</h1>
    //      </div>
    //      <p className="text-sm text-center mt-2">Seconds</p>
    //    </div>
    //  </div>
    <div className="w-full">
      <Countdown
        date={new Date(expiration?.toString() * 1000)}
        renderer={renderer}
      />
    </div>
  );
};

export default CountdownTimer;
