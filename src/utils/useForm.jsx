import React, { useEffect } from "react";
import { useState } from "react";

export function useForm(initValues, validateOnChange = false, validate, role,) {
  const [values, setValues] = useState(initValues);
  const [errors, setErrors] = useState({});
  const [checkUsernameExist, setCheckUsernameExist] = useState(false)

  useEffect(() => {
    if (role === undefined) {
      // console.log("role = null");
    } else {
      // console.log("role != null");
      setValues({
        ...values,
        ["role"]: role,
      });
    }
  }, []);

  const handleInputChage = (e) => {
    const { name, value } = e.target;

    if (name === "username" && checkUsernameExist === true) {
      console.log("Exist")

      
    }

    setValues({
      ...values,
      [name]: value,
    });
    if (validateOnChange) {
      validate({ [name]: value });
    }
  };

  function changeCitizen(toggle) {
    setValues({
      ...values,
      ["isCitizen"]: toggle,
    });
  }

  return {
    values,
    setValues,
    handleInputChage,
    errors,
    setErrors,
    changeCitizen,
    role,
    checkUsernameExist,
    setCheckUsernameExist
  };
}

export function Form(props) {
  const { children, ...other } = props;
  return <form {...other}>{props.children}</form>;
}
