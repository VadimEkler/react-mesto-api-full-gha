import { useEffect, useState } from "react";
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { authorization, registration, getDataUser } from '../utils/auth.js';
import api from "../utils/api.js";
import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import PopupWithForm from "./PopupWithForm/PopupWithForm.jsx";
import ImagePopup from "./ImagePopup/ImagePopup.jsx";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup.jsx";
import EditAvatarPopup from "./EditAvatarPopup.jsx";
import AddPlacePopup from "./AddPlacePopup.jsx";
import InfoTooltip from "./InfoTooltip/InfoTooltip.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import ProtectedComponent from "./ProtectedComponent.jsx";



function App() {
  const navigate = useNavigate();

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isRequestPopupOpen, setIsRequestPopupOpen] = useState(false);
  const [isImagePopup, setIsImagePopup] = useState(false);
  
  
  const [deleteCard, setDeleteCard] = useState("");
  const [selectedCard, setSelectedCard] = useState({});

  const [currentUser, setCurrentUser] = useState({});
  const [dataUser, setDataUser] = useState('')

  const [cards, setCards] = useState([]);

  const [isSuccessful, setIsSuccessful] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.jwt) {
      getDataUser(localStorage.jwt)
        .then(res => {
          setDataUser(res.data.email)
          setLoggedIn(true)
          navigate('/')
        })
        .catch(error => console.log(`Ошибка при входе ${error}`))
    } else {
      setLoggedIn(false)
    }
  }, [navigate])


  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getInfo(), api.getCards()])
        .then(([dataUser, dataCard]) => {
          setCurrentUser(dataUser);
          setCards(dataCard);
        })
        .catch((error) =>
          console.error(`Ошибка при загрузке начальных данных страницы ${error}`),
        );
    }
  }, [loggedIn]);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleDeleteCardClick(card) {
    setDeleteCard(card);
    setIsDeletePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopup(true);
  }

  function handleCardDelete(e) {
    e.preventDefault();
    api
      .removeCard(deleteCard)
      .then(() => {
        setCards(
          cards.filter((card) => {
            return card._id !== deleteCard;
          }),
        );
        closeAllPopups();
      })
      .catch((error) => console.error(`Ошибка при удалении карточки ${error}`));
  }

  function handleUpdateUser(data, reset) {
    api
      .setUserInfo(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
        reset();
      })
      .catch((error) =>
        console.error(`Ошибка при редактировании профиля ${error}`),
      );
  }

  function handleUpdateAvatar(data, reset) {
    api
      .setNewAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
        reset();
      })
      .catch((error) =>
        console.error(`Ошибка при обновлении аватара ${error}`),
      );
  }

  function handleAddPlaceSubmit(data, reset) {
    api
      .addCard(data)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
        reset();
      })
      .catch((error) =>
        console.error(`Ошибка при добавлении карточки ${error}`),
      );
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeletePopupOpen(false);
    setIsImagePopup(false);
    setIsRequestPopupOpen(false);
  }

  function handleLogin(password, email) {
    authorization(password, email)
      .then(res => {
        localStorage.setItem('jwt', res.token)
        setLoggedIn(true)
        navigate('/')
      })
      .catch(error => {
        setIsRequestPopupOpen(true)
        setIsSuccessful(false)
        console.error(`Ошибка при авторизации ${error}`)
      })
  }

  function handleRegister(password, email) {
    registration(password, email)
      .then(() => {
        setIsRequestPopupOpen(true)
        setIsSuccessful(true)
        navigate('/sign-in')
      })
      .catch((error) => {
        setIsRequestPopupOpen(true)
        setIsSuccessful(false)
        console.error(`Ошибка при регистрации ${error}`)
      })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <>

      <Routes>
        <Route path='/' element={
          <ProtectedRoute
            loggedIn={loggedIn}
            dataUser={dataUser}
            element = {ProtectedComponent}
            onEditProfile={handleEditProfileClick}
            onEditAvatar={handleEditAvatarClick}
            onAddCard={handleAddPlaceClick}
            onDelete={handleDeleteCardClick}
            onCardImageClick={handleCardClick}
            cards={cards}
          />
        } 
        />

        <Route path='/sign-up' element={
        <>
          <Header name='sign-up'/>
          <Main name='sign-up' handleRegister={handleRegister}/>
        </>
        } />


        <Route path='/sign-in' element={
        <>
          <Header name='sign-in'/>
          <Main name='sign-in' handleLogin={handleLogin}/>
        </>
        }/> 
        {/* Эндпоинт для произвольного пути */}
        <Route path='*' element={<Navigate to='/' replace />}/>
        
      </Routes>

        
        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <PopupWithForm
          name="delete"
          title="Вы уверены?"
          buttonDefaultValue="Да"
          isOpen={isDeletePopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleCardDelete}
        />

        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopup}
          onClose={closeAllPopups}
        />

        <InfoTooltip 
          name='result'
          isSuccessful={isSuccessful}
          isOpen={isRequestPopupOpen}
          onClose={closeAllPopups}
        />
        
      </>
    </CurrentUserContext.Provider>
  );
}

export default App;
