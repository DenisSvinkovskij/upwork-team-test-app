import React, { FC } from 'react';

interface ButtonProps {
  title: string;
  onClick: () => void;
  extraClass?: string;
}

export const Button: FC<ButtonProps> = ({ onClick, title, extraClass }) => {
  return (
    <div onClick={onClick} className={`button ${extraClass}`}>
      {title}
    </div>
  );
};
