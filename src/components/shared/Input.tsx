import React, { forwardRef } from "react";
import "./Input.css";

interface IInputProps extends React.ComponentPropsWithoutRef<"input"> {
  label?: string;
}

const Input = forwardRef<HTMLInputElement, IInputProps>(
  ({ id, label, ...rest }, ref) => {
    return (
      <div>
        {label ? <label htmlFor={id}>{label}</label> : null}
        <input className="input-component" {...rest} id={id} ref={ref} />
      </div>
    );
  }
);

export default Input;
