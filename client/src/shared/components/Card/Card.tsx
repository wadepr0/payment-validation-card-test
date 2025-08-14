import React, { FC } from "react";

interface IProps {
  children: React.ReactNode;
}

const Card: FC<IProps> = ({ children }) => (
  <div className="w-96 h-96 border border-gray-300 rounded-lg shadow-md bg-white p-4 flex justify-center items-center">
    {children}
  </div>
);

export default Card;
