import './PopupWithForm.css';
import Popup from '../Popup/Popup.jsx'
import Form from '../Form/Form.jsx';

export default function PopupWithForm({
    name,
    title,
    buttonDefaultValue,
    children,
    isOpen,
    onClose,
    onSubmit,
    isValid = true,
  }) {

    return (
      <Popup 
        name ={ name }
        isOpen = { isOpen }
        onClose = { onClose }
      >
        <h2
          className={`${
              name === "delete" ? "popup__title_type_delete" : ""
            } popup__title`}
          >
            {title}
          </h2>

        <Form
          name = {name}
          children = {children}
          buttonDefaultValue  ={buttonDefaultValue} 
          isValid = {isValid}
          onSubmit= {onSubmit}
        />
      </Popup>
    );
  }
  