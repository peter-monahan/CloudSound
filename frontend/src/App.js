import { Switch, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import SplashPage from "./components/SplashPage";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import UserPage from "./components/UserPage";
import CreateSongForm from "./components/CreateSongForm";
import EditSongForm from "./components/EditSongForm";
import SongPage from "./components/SongPage";
import SongListPage from "./components/SongListPage/SongListPage";
import CreateAlbumForm from "./components/CreateAlbumForm";
import Footer from "./components/Footer";
import { restoreUser } from "./store/session";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { getAlbum, resetAlbum, getPlaylist, resetPlaylist } from "./store/display";


import './index.css';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(restoreUser()).then(() => setIsLoaded(true));

  }, []);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
    <div className="container">

      <Switch>

        <Route exact path={'/'}>
          <SplashPage isLoaded={isLoaded} />
        </Route>

        <Route path={'/login'}>
          <LoginForm />
        </Route>

        <Route path={'/signup'}>
          <SignupForm />
        </Route>

        <Route exact path={'/users/:userId'}>
          <UserPage isLoaded={isLoaded} />
        </Route>

        <Route path={'/songs/create'}>
          <CreateSongForm />
        </Route>

        <Route exact path={'/songs/:songId'}>
          <SongPage />
        </Route>

        <Route path={'/songs/:songId/edit'}>
          <EditSongForm />
        </Route>

        <Route path={'/albums/create'}>
          <CreateAlbumForm />
        </Route>

        <Route path={'/albums/:id'}>
          <SongListPage type={'album'} getItem={getAlbum} resetItem={resetAlbum} iconName={'compact-disc'} />
        </Route>

      </Switch>
    </div>
    <Footer />
    </>
  );
}

export default App;
