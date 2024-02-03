import './Main.css';
import Card from "../Card/Card.jsx";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import Register from '../Register.jsx';
import Login from '../Login.jsx';

export default function Main({
  name,
  onEditProfile,
  onAddCard,
  onEditAvatar,
  onDelete,
  onCardImageClick,
  cards,
  handleLogin,
  handleRegister,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
        {  name === 'sign-in' ?
            <Login buttonDefaultValue='Войти' name={name} handleLogin={handleLogin}/> 
            : name === 'sign-up' ? 
            <Register name={name} handleRegister={handleRegister}/> 
            :   
            <>
          <section className="profile" aria-label="Профиль">
          <div className="profile__card">
            <button
              type="button"
              className="profile__portrait-edit-btn"
              onClick={onEditAvatar}
            >
              <img
                className="profile__portrait"
                src={currentUser.avatar || "#"}
                alt="Аватар профиля"
              />
            </button>
            <div className="profile__info">
              <h1 className="profile__user-nickname">{currentUser.name || ""}</h1>
              <button
                className="profile__edit-btn"
                type="button"
                onClick={onEditProfile}
              />
              <p className="profile__user-description">
                {currentUser.about || ""}
              </p>
            </div>
            <button
              className="profile__add-btn"
              type="button"
              aria-label="Добавить фото"
              onClick={onAddCard}
            />
          </div>
        </section>
        <section className="gallery" aria-label="Галерея">
          <ul className="gallery__list">
            {cards.map((data) => {
              return (
                <li key={data._id}>
                  <Card
                    card={data}
                    onCardImageClick={onCardImageClick}
                    onDelete={onDelete}
                  />
                </li>
              );
            })}
          </ul>
        </section>
        </>}
    </main>
  );
}
