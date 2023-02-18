import React from "react";
import "./Button.css";

interface IButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  children: React.ReactNode;
}

export default function Button({ children, ...rest }: IButtonProps) {
  return <button {...rest}>{children}</button>;
}
