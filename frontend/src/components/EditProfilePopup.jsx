import { useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm/PopupWithForm.jsx";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import useFormValidator from "../hooks/useFormValidator.js";
import Input from "./Input/Input.jsx";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const {
    values,
    errors,
    isInputValid,
    isValid,
    handleChange,
    reset,
    setValue,
  } = useFormValidator();

  useEffect(() => {
    setValue("nickname", currentUser.name);
    setValue("description", currentUser.about);
  }, [currentUser, setValue]);

  function closeWithReset() {
    onClose();
    reset({ nickname: currentUser.name, description: currentUser.about });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser(
      { nickname: values.nickname, description: values.description },
      reset,
    );
  }

  return (
    <PopupWithForm
      name="user-info"
      title="Редактировать профиль"
      buttonDefaultValue="Сохранить"
      isOpen={isOpen}
      onClose={closeWithReset}
      isValid={isValid}
      onSubmit={handleSubmit}
    >
      <Input 
        name="nickname" 
        type="text" 
        placeholder="Ваше имя" 
        minLength={2}
        maxLength={40}
        isInputValid={isInputValid.nickname}
        value={values.nickname}
        onChange={handleChange}
        error={errors.nickname}
      />
      <Input 
        name="description"
        type="text"
        placeholder="Расскажите о себе"
        minLength={2}
        maxLength={200}
        isInputValid={isInputValid.description}
        value={values.description}
        onChange={handleChange}
        error={errors.description}
      />
    </PopupWithForm>
  );
}
