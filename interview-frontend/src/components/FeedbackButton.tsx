import { FC } from "react";

interface ButtonProps {
  color?: string;
  textColor?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: any;
  padd?: string;
  children: any;
}
const ColorButton: FC<ButtonProps> = (props) => {
  const classData: string = `bg-sky-800
    text-lg
    h-auto 
    w-full 
    transition
    transform
    duration-500
    hover:scale-110
    text-center 
    pt-2
    pb-2
    px-4
    rounded-lg
    focus:outline-none
    active:opacity-75`;
  return (
    <button
      onClick={props.onClick}
      className={classData}
      disabled={props.disabled}
      type={props.type}
    >
      {props.children}
    </button>
  );
};

const FreeButton: FC<ButtonProps> = (props) => {
  const classData: string = `bg-transparent
      text-lg
      h-auto 
      w-full
      transition
      transform
      duration-500
      hover:scale-110
      text-center 
      pt-2
      pb-2
      px-4
      rounded-lg
      focus:outline-none
      active:opacity-75`;
  return (
    <button
      onClick={props.onClick}
      className={classData}
      disabled={props.disabled}
      type={props.type}
    >
      {props.children}
    </button>
  );
};

export { FreeButton, ColorButton };
