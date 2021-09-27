import React, { Ref } from "react";
import classes from "./Input.module.css";

interface InputProps {
  input: Record<string, string>;
  label: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input ref={ref} {...props.input} />
    </div>
  );
});

export default Input;
