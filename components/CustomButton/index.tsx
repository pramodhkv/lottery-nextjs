import React from "react";

interface ICustomButtonProps {
  text: string;
  isActive?: boolean;
  onClick?: () => void;
}

const CustomButton = (props: ICustomButtonProps) => {
  const { text, isActive, onClick } = props;

  return (
    <button
      className={`${
        isActive ? "bg-gradient-to-r from-cyan-500 to-emerald-500" : ""
      } hover:bg-gradient-to-r hover:from-cyan-700 hover:to-emerald-700 text-white font-bold py-2 px-4 rounded-lg`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default CustomButton;
