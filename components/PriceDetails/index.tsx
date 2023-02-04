import React from "react";

export interface IPriceDetails {
  price: string;
  text: string;
}

const PriceDetails = (props: IPriceDetails) => {
  const { price, text } = props;

  return (
    <div className="flex justify-between w-full items-center">
      <h1>{text}</h1>
      <p className="font-extrabold">{price}</p>
    </div>
  );
};

export default PriceDetails;
