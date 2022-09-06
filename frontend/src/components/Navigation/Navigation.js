import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { logoutUser } from "../../store/session";
import './Navigation.css';
import ProfileButton from "./ProfileButton/ProfileButton";


const Navigation = ({isLoaded}) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);

  const logout = () => {
    dispatch(logoutUser())
  }

  const sessionLinks = (!user &&
    <>
    <div className="nav-group">
    <NavLink to={'/login'} className="nav-button login">Login</NavLink>
    <NavLink to={'/signup'} className="nav-button signup">Signup</NavLink>
    </div>
    </>
  ) || (
    <ProfileButton user={user} />
  )

  return (
    <>
    <nav className="navbar">
      <div className="nav-group">
      <h1>CloudSound</h1>
      <NavLink to={'/'} className="nav-button home">Home</NavLink>
      </div>
      <div className="nav-spacer"></div>
      {isLoaded && sessionLinks}
    </nav>
    <div className="navbar-placeholder"></div>
    </>
  );
}

export default Navigation;
