import './Card.css';

import { useContext, useState, useEffect } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import api from "../../utils/api";

export default function Card({ card, onCardImageClick, onDelete }) {
  const currentUser = useContext(CurrentUserContext);

  const [isLiked, setIsLiked] = useState(false);
  const [likeCounter, setLikeCounter] = useState(card.likes.length);
  const [isOwn, setIsOwn] = useState(card.owner === currentUser._id);

  useEffect(() => {
    setIsOwn(card.owner === currentUser._id);
  }, [currentUser._id, card.owner])

  useEffect(() => {
    setIsLiked(card.likes.some((item) => currentUser._id === item));
  }, [card.likes, currentUser._id]);

  function handleLikeClick() {
    if (isLiked) {
      api
        .removeLike(card._id, localStorage.jwt)
        .then((res) => {
          setIsLiked(false);
          setLikeCounter(res.likes.length);
        })
        .catch((err) => console.error(`Ошибка при снятии лайка ${err}`));
    } else {
      api
        .addLike(card._id, localStorage.jwt)
        .then((res) => {
          setIsLiked(true);
          setLikeCounter(res.likes.length);
        })
        .catch((err) => console.error(`Ошибка при нажатии лайка ${err}`));
    }
  }

  return (
    <article className="card">
      <div className="card__wrapper">
        <img
          className="card__image"
          alt={card.name}
          src={card.link}
          onClick={() => onCardImageClick({ link: card.link, name: card.name })}
        />
        {isOwn && (
          <button
            className="card__delete-button"
            type="button"
            onClick={() => onDelete(card._id)}
          />
        )}
      </div>
      <h2 className="card__title">{card.name}</h2>
      <div className="card__like-wrapper">
        <button
          className={`card__like-button ${isLiked ? "card__like-button_active" : ""
            }`}
          type="button"
          onClick={handleLikeClick}
        />
        <span className="card__like-counter">{likeCounter}</span>
      </div>
    </article>
  );
}
