import './ImagePopup.css';

export default function ImagePopup({ card, isOpen, onClose }) {
  return (
    <div className={`popup image-popup ${isOpen && "popup_opened"}`}>
      <div className="image-popup__wrapper">
        <button className="popup__close-btn" type="button" onClick={onClose} />
        <figure className="image-popup__container">
          <img
            className="image-popup__image"
            alt={card.name || "#"}
            src={card.link || "#"}
          />
          <figcaption className="image-popup__caption">{card.name}</figcaption>
        </figure>
      </div>
    </div>
  );
}
