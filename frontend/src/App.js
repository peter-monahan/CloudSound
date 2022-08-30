import { Switch, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import UserPage from "./components/LoginForm/UserPage";
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
    <div className="container">
      <Navigation isLoaded={isLoaded} />

      <Switch>

        <Route exact path={'/'}>

        </Route>

        <Route path={'/login'}>
          <LoginForm />
        </Route>

        <Route path={'/signup'}>
          <SignupForm />
        </Route>

        <Route path={'/users/:userId'}>
          <UserPage />
        </Route>

      </Switch>
    </div>
  );
}

export default App;
