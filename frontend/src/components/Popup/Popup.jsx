import './Popup.css';

export default function Popup({name, children, isOpen, onClose, }) {
    

    return(
        <div className={`popup popup_type_${name} ${isOpen && "popup_opened"}`}>
            <div className="popup__content">
                <button className="popup__close-btn" type="button" onClick={onClose} />
                {children}
            </div>
        </div>
    )
}