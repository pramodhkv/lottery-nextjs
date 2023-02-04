import React from "react";

interface ITicketsOwnedBoxProps {
  userTickets: number;
}

const TicketsOwnedBox = (props: ITicketsOwnedBoxProps) => {
  const { userTickets } = props;

  return (
    <div className="mt-5 border border-emerald-800 rounded-lg p-4">
      <p>Your tickets in this draw:</p>

      <div className="flex items-center justify-center w-full mt-2">
        <div className="bg-emerald-900 border border-none rounded-lg p-5 w-1/2">
          <h1 className="text-2xl text-center text-white">{userTickets}</h1>
        </div>
      </div>
    </div>
  );
};

export default TicketsOwnedBox;
