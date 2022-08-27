import { Switch, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";

function App() {
  return (
    <div className="container">
      <h1>Yo</h1>
      <Switch>
        <Route path={'/login'}>
          <LoginForm />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
