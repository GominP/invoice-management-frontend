import { TextField } from "@material-ui/core";
import React from "react";

export default function Input(props) {
  const { name, value, label, onChange, error = null, disabled } = props;
  return (
    <TextField
      disabled={disabled}
      variant="outlined"
      label={label}
      //   placeholder="ชื่อผู้ใช้"
      name={name}
      value={value}
      onChange={onChange}
      //   helperText="someee"
      {...(error && { error: true, helperText: error })}
    />
  );
}
