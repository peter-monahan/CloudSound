import { Switch, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import UserPage from "./components/UserPage";
import CreateSongForm from "./components/CreateSongForm";
import EditSongForm from "./components/EditSongForm";
import SongPage from "./components/SongPage";
import { restoreUser } from "./store/session";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
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

      </Switch>
    </div>
    </>
  );
}

export default App;
