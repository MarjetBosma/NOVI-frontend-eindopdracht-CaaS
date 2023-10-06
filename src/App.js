import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import Home from "./pages/home/Home";
import SignUp from "./pages/signup/SignUp";
import SignIn from "./pages/signin/SignIn";
import Images from "./pages/images/Images";
import Profile from "./pages/profile/Profile";
import Favorites from "./pages/favorites/Favorites";
import FavoriteImageDetail from "./pages/favorite-image-detail/FavoriteImageDetail";
import FetchedImageDetail from "./pages/fetched-image-detail/FetchedImageDetail";
import NotFound from "./pages/notFound/NotFound";
import { AuthContext } from "./context/AuthContext";
import logo from "./assets/caas-logo-no-text.jpg"
import "./App.css";
function App() {
  const { isAuth } = useContext(AuthContext);

  return (
    <div className="outer-container">
      <header>
        <span className="logo-text-container-header">
            <span className="logo-container-header">
              <img className="logo-small" src={logo} alt="Logo Cat as a Service, cat with glasses and laptop"/>
            </span>
            <span className="text-container-header">
                <h3 className="caas-small">CaaS</h3>
                <p className="cat-as-a-service-small">Cat as a Service</p>
            </span>
        </span>
        <span className="navbar-container">
          <NavigationBar />
        </span>
      </header>
      <div>
        <Routes>
          <Route exact path="/" element={<Home />}/>
          <Route path="/signup" element={<SignUp />}/>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/images" element={isAuth ? <Images /> : <Navigate to="/signin" />}/>
          <Route path="/profile" element={isAuth ? <Profile /> : <Navigate to="/signin" />}/>
          <Route path="/favorites" element={isAuth ? <Favorites /> : <Navigate to="/signin" />}/>
          <Route path="/favorites/:index" element={<FavoriteImageDetail/>}/>
          <Route path="/cat" element={<FetchedImageDetail/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </div>
      <footer>
        <p className="footer-text">
            © Marjet Bosma, Eindopdracht Frontend, NOVI Hogeschool
        </p>
      </footer>
    </div>
  );
}

export default App;
