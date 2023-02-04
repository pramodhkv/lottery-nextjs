import React from "react";

interface ICountdownBoxProps {
  value: number;
  text: string;
}

const CountdownBox = (props: ICountdownBoxProps) => {
  const { value, text } = props;
  return (
    <div className="flex flex-col flex-1">
      <div className="bg-emerald-900 border border-none rounded-lg px-3 py-5">
        <h1 className="text-2xl text-center">{value}</h1>
      </div>
      <p className="text-sm text-center mt-2">{text}</p>
    </div>
  );
};

export default CountdownBox;
