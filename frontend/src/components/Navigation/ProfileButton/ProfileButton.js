import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../../store/session';
import './ProfileButton.css';
import { Link } from "react-router-dom";


function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(logoutUser());
  };

  return (
    <div className="profile-button">

      {( user.previewImage && user.previewImage.length > 1 && <img src={user.previewImage} onClick={openMenu} className='user-icon-img' />) || <i className="fas fa-user-circle fa-2xl user-icon" onClick={openMenu} />}

      {showMenu && (
        <ul className="profile-dropdown">
          <li>
            <Link to={`/users/${user.id}`}>Profile</Link>
          </li>
          <li>
          <Link to={'/settings'}>Settings</Link>
          </li>
          <li>
            <button onClick={logout}>Log Out</button>
          </li>
        </ul>
      )}
    </div>

  );
}

export default ProfileButton;
