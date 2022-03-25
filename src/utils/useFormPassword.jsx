import React, { useEffect } from "react";
import { useState } from "react";

export function useFormPassword(initValues, validateOnChange = false, validatePassword) {
  const [valuesPassword, setValuesPassword] = useState(initValues);
  const [errorPassword, setErrorsPassword] = useState({});

  useEffect(() => {}, []);

  const handleInputChagePassword = (e) => {
    const { name, value } = e.target;

    setValuesPassword({
      ...valuesPassword,
      [name]: value,
    });
    if (validateOnChange) {
        validatePassword({ [name]: value });
    }
  };

  return {
    valuesPassword,
    setValuesPassword,
    handleInputChagePassword,
    errorPassword,
    setErrorsPassword,
  };
}

export function FormPassword(props) {
  const { children, ...other } = props;
  return <form {...other}>{props.children}</form>;
}
