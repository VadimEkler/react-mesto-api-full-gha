import InitialMenu from "./InitialMenu/InitialMenu.jsx";
import useFormValidation from '../hooks/useFormValidator.js';
import Input from "./Input/Input.jsx";


export default function Register({ name, handleRegister }) {
  const { values, errors, isValid, isInputValid, handleChange } = useFormValidation()

  function onRegister(evt) {
    evt.preventDefault()
    handleRegister(values.password, values.email)
  }

  return (
    <InitialMenu name={name} onSubmit={onRegister} isValid={isValid}>
      <Input
        name='email'
        type='email'
        placeholder={'Email'}
        value={values.email}
        onChange={handleChange}
        isInputValid={isInputValid.email}
        error={errors.email}
      />
      <Input
        name='password'
        type='password'
        placeholder={'Пароль'}
        minLength={3}
        value={values.password}
        onChange={handleChange}
        isInputValid={isInputValid.password}
        error={errors.password}
      />
    </InitialMenu>
  )
}