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
    <NavLink to={'/login'}>Login</NavLink>
    <NavLink to={'/signup'}>Signup</NavLink>
    </>
  ) || (
    <ProfileButton user={user} />
  )

  return (
    <nav className="navbar">
      <h1>CloudSound</h1>
      <NavLink to={'/'}>Home</NavLink>
      {isLoaded && sessionLinks}
    </nav>
  );
}

export default Navigation;
