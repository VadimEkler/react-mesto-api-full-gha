import { useState, useCallback } from "react";

export default function useFormValidator() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isInputValid, setIsInputValid] = useState({});
  const [isValid, setIsValid] = useState(false);

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    const validationMessage = e.target.validationMessage;
    const valid = e.target.validity.valid;
    const form = e.target.form;

    setValues((initialValues) => {
      return { ...initialValues, [name]: value };
    });

    setErrors((initialErrors) => {
      return { ...initialErrors, [name]: validationMessage };
    });

    setIsInputValid((initialValidity) => {
      return { ...initialValidity, [name]: valid };
    });

    setIsValid(form.checkValidity());
  }

  function reset(data = {}) {
    setValues(data);
    setErrors({});
    setIsInputValid({});
    setIsValid(false);
  }

  const setValue = useCallback((name, value) => {
    setValues((initialValues) => {
      return { ...initialValues, [name]: value };
    });
  }, []);

  return {
    values,
    errors,
    isInputValid,
    isValid,
    handleChange,
    reset,
    setValue,
  };
}
