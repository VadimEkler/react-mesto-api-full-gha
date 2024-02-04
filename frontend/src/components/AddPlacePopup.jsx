import PopupWithForm from "./PopupWithForm/PopupWithForm.jsx";
import useFormValidator from "../hooks/useFormValidator.js";
import Input from "./Input/Input.jsx";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const { values, errors, isInputValid, isValid, handleChange, reset } =
    useFormValidator();

  function closeWithReset() {
    onClose();
    reset();
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({ name: values.name, link: values.link }, reset);
  }

  return (
    <PopupWithForm
      name="add-image"
      title="Новое место"
      buttonDefaultValue="Создать"
      isOpen={isOpen}
      onClose={closeWithReset}
      isValid={isValid}
      onSubmit={handleSubmit}
    >
      <Input
      name="name"
      type="text"
      placeholder="Новое место"
      minLength={2}
      maxLength={30}
      isInputValid={isInputValid.name}
      value={values.name}
      onChange={handleChange}
      error={errors.name}
      />
      <Input
      name="link"
      type="url"
      placeholder="Ссылка на картинку"
      isInputValid={isInputValid.link}
      value={values.link}
      onChange={handleChange}
      error={errors.link}
      />
    </PopupWithForm>
  );
}
