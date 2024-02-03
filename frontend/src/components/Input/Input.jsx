import './Input.css';

export default function Input({ name, type, placeholder, minLength, maxLength, value, onChange, isInputValid, error }) {
    
    return(
        <div className="input__container">
            <input
                className={`input ${name === 'email' || name === 'password' ? 'input__initial-form' : ''}  ${ isInputValid === undefined || isInputValid ? "" : "input_invalid"} `}
                name= {name}
                type= {type}
                autoComplete='off'
                placeholder= {placeholder}
                minLength= {minLength || ''}
                maxLength= {maxLength|| ''}
                required
                value= {value || ''}
                onChange= {onChange}
            />
        
            <span className="input__error">
                {error}
            </span>
        </div>
    )
}

