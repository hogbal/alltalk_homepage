import React from "react";
import "./Input.scss";

const Input = (props) => {
  const { type, placeholder, onChange, name, value, error, maxlength } = props;
  return (
    <input
      className={` inputBox ${error && "inputBox-error"}`}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      name={name}
      value={value}
      maxLength={maxlength}
    />
  );
};

export default React.memo(Input);
