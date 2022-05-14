import React from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';

import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';
import auth from '../utils/Auth';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';

function App() {
  const history = useHistory();
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [registerSuccess, setRegisterSuccess] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [inInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({
    name: "",
    about: "",
    avatar: "",
    _id: "",
    cohort: "",
  });

  const [cards, setCards] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (loggedIn) {
    api
      .getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
    }
  }, [loggedIn]);

  React.useEffect(() => {
    if (loggedIn) {
    api
      .getUserInfo()
      .then((res) => {
        setCurrentUser((user) => ({
          ...user,
          ...res,
        }));
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
    }
  }, [loggedIn]);

  const tokenCheck = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }
    auth
      .getContent(token)
      .then((res) => {
      setLoggedIn(true);
      setCurrentUser((user) => ({
        ...user,
        email: res.data.email,
      }));
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
  };

  React.useEffect(() => {
    if (loggedIn) {
      history.push('/');
    }
  }, [history, loggedIn]);

  React.useEffect(() => {
    tokenCheck();
  }, [history]);


  const onRegister = (data) => {
    return auth
      .signup(data)
      .then((res) => {
        setRegisterSuccess(true);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
      })
      .finally(() => setIsInfoTooltipOpen(true));

  };

  const onLogin = (data) => {
    return auth
      .signin(data)
      .then((res) => {
      localStorage.setItem('token', res.token);
      tokenCheck();
    })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
        setIsInfoTooltipOpen(true);
    })
  };

  const onLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem('token');
    history.push('/sign-in');
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsImagePopupOpen(true)
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleCardDelete(cardId) {
    api
      .deleteCard(cardId)
      .then(() => {
        setCards((cards) => cards.filter((card) => card._id !== cardId));
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  const handleUpdateUser = (newUserInfo) => {
    setIsLoading(true);
    api
      .setUserInfo(newUserInfo)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleUpdateAvatar = (data) => {
    setIsLoading(true);
    api
      .setUserAvatar(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleAddPlaceSubmit = (newData) => {
    setIsLoading(true);
    api
      .addCard(newData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard({});
  }


  return (
      <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header loggedIn={loggedIn} onLogout={onLogout} />
        <Switch>
          <Route path="/sign-up">
            <Register
              onRegister={onRegister}
              registerSuccess={registerSuccess}
            />
            <InfoTooltip
              isOpen={inInfoTooltipOpen}
              registerSuccess={registerSuccess}
              onClose={closeAllPopups}
            />
          </Route>
          <Route path="/sign-in">
            <Login
              onLogin={onLogin}
            />
            <InfoTooltip
              isOpen={inInfoTooltipOpen}
              registerSuccess={registerSuccess}
              onClose={closeAllPopups}
            />

          </Route>
          <ProtectedRoute exact path="/" loggedIn={loggedIn}>
            <Main
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />

            <Footer />

            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
              onLoading={isLoading}
            />

            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
              onLoading={isLoading}
            />

            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
              onAddPlace={handleAddPlaceSubmit}
              onLoading={isLoading}
            />

            <ImagePopup
              isOpen={isImagePopupOpen}
              card={selectedCard}
              onClose={closeAllPopups}
            />
          </ ProtectedRoute>

          <Route path="*">
            <Redirect to='/' />
          </Route>
        </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
