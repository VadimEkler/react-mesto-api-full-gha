import './InfoTooltip.css';
import Popup from "../Popup/Popup";


export default function InfoTooltip({ name, isSuccessful , isOpen, onClose }) {
    
    
    return(
        <Popup name={name} isOpen={isOpen} onClose={onClose}>
            <div className={`infotooltip ${isSuccessful ? 'infotooltip__request-success' : 'infotooltip__request-fail'}`}></div>
            <h2 className='infotooltip__message' >{isSuccessful ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</h2>
        </Popup>
    )
}