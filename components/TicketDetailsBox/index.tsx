import {
  useAddress,
  useContractRead,
  useContractWrite,
} from "@thirdweb-dev/react";
import { SmartContract } from "@thirdweb-dev/sdk";
import { BaseContract, ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { currency } from "../../constants";
import PriceDetails, { IPriceDetails } from "../PriceDetails";
import TicketsOwnedBox from "../TicketsOwnedBox";

interface ITicketDetailsBoxProps {
  contract: SmartContract<BaseContract> | undefined;
  remainingTickets: string;
}

const TicketDetailsBox = (props: ITicketDetailsBoxProps) => {
  const { contract, remainingTickets } = props;

  const [quantity, setQuantity] = useState<number>(1);
  const [userTickets, setUserTickets] = useState<number>(0);

  const address = useAddress();

  const { data: ticketPrice } = useContractRead(contract, "ticketPrice");
  const { data: serviceFee } = useContractRead(contract, "ticketCommission");
  const { data: expiration } = useContractRead(contract, "expiration");
  const { mutateAsync: BuyTickets } = useContractWrite(contract, "BuyTickets");
  const { data: tickets } = useContractRead(contract, "getTickets");

  const priceDetailsList: IPriceDetails[] = [
    {
      text: "Total cost of tickets",
      price:
        ticketPrice &&
        Number(ethers.utils.formatEther(ticketPrice.toString())) * quantity +
          " " +
          currency,
    },
    {
      text: "Service fee",
      price:
        serviceFee &&
        Number(ethers.utils.formatEther(serviceFee.toString())) +
          " " +
          currency,
    },
    {
      text: "Network fee",
      price: "TBC",
    },
  ];

  useEffect(() => {
    const numberOfTickets = tickets?.reduce(
      (acc: number, ticketAddress: string) => {
        if (ticketAddress === address) {
          return acc + 1;
        }

        return acc;
      },
      0
    );

    setUserTickets(numberOfTickets);
  }, [tickets]);

  const handleBuyTicketsClick = async () => {
    if (!ticketPrice) {
      return;
    }

    const notification = toast.loading("Buying tickets...");

    try {
      const data = await BuyTickets([
        {
          value: ethers.utils.parseEther(
            (
              Number(ethers.utils.formatEther(ticketPrice)) * quantity
            ).toString()
          ),
        },
      ]);

      toast.success("Tickets bought", {
        id: notification,
      });

      console.log("success", data);
    } catch (error) {
      toast.error("Error buying tickets", {
        id: notification,
      });

      console.error(error);
    }
  };

  return (
    <div className="border-2 border-emerald-800 shadow-xl rounded-lg w-full flex flex-col items-center justify-center flex-1 p-7">
      <div className="flex justify-between items-center w-full">
        <h1>Price per ticket</h1>
        <p>
          {ticketPrice && ethers.utils.formatEther(ticketPrice.toString())}{" "}
          {currency}
        </p>
      </div>

      <div className="border border-emerald-800 rounded-lg p-4 flex justify-between items-center w-full my-5">
        <h1 className="uppercase">Tickets</h1>
        <input
          type="number"
          name="quantity"
          id=""
          min={1}
          max={10}
          className="bg-transparent outline-none text-white text-right w-full"
          value={quantity}
          onChange={(event) => setQuantity(Number(event.target.value))}
        />
      </div>

      <div className="flex flex-col gap-4 w-full text-green-600 italic">
        {priceDetailsList.map((priceDetails, index) => (
          <PriceDetails
            key={`priceDetails-${index}`}
            text={priceDetails.text}
            price={priceDetails.price}
          />
        ))}
      </div>

      <button
        className="mt-5 w-full p-3 text-white rounded-lg bg-gradient-to-r from-orange-500 to-emerald-500 shadow-xl disabled:from-gray-600 disabled:to-gray-600 disabled:text-gray-100 disabled:cursor-not-allowed"
        disabled={
          expiration?.toString() < Date.now().toString() ||
          quantity > Number(remainingTickets || 0)
        }
        onClick={handleBuyTicketsClick}
      >
        Buy {quantity} Tickets for{" "}
        {ticketPrice &&
          quantity *
            Number(ethers.utils.formatEther(ticketPrice.toString()))}{" "}
        {currency}
      </button>

      {userTickets > 0 && <TicketsOwnedBox userTickets={userTickets} />}
    </div>
  );
};

export default TicketDetailsBox;
