import './InitialMenu.css';
import Form from '../Form/Form.jsx';
import { Link } from 'react-router-dom';

export default function InitialMenu({ name, children, isValid, onSubmit }){
    
    
    return(
        <section className='initial-menu'>
            <h2 className='initial-menu__title'>
                {name === 'sign-in' ? 'Вход' : 'Регистрация'}
            </h2>
            <Form
                name = {name}
                children = {children}
                isValid = {isValid}
                onSubmit = {onSubmit}
                buttonDefaultValue= {name === 'sign-up' ? 'Зарегистрироваться' : 'Войти'}
            /> 
            

            {name === 'sign-up' &&
            <div className='initial-menu__wrapper'>
                <p className='initial-menu__subtitle'>Уже зарегистрированы?</p>
                <Link className='initial-menu__subtitle' to='/sign-in'>Войти</Link>
            </div>
            }
        </section>
    )
}



