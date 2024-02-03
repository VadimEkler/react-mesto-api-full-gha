import './Form.css';

export default function Form({ name, children, buttonDefaultValue, isValid, onSubmit }) {
    
    return(
        <form
            className="form"
            name={`${name}-edit-form`}
            noValidate
            onSubmit={onSubmit}
          >
            {children}
            {name === 'sign-in' || name === 'sign-up' ? 
              <input 
                className={`form__save-button_initial-form ${isValid ? '' : 'form__save-button_initial-form_invalid'}`}
                value={`${buttonDefaultValue}`}
                disabled = {!isValid}
                type="submit"
                >
              </input>
              :
              <input 
                className={`form__save-button ${isValid ? '' : 'form__save-button_invalid'}`}
                value={`${buttonDefaultValue}`}
                disabled = {!isValid}
                type="submit" 
                >
              </input>
            }

          </form>

    )
}