import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../../store/session';
import './ProfileButton.css';
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";


function ProfileButton({ user }) {
  const history = useHistory();
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
    history.push('/');
  };

  return (
    <div className="profile-button">

      {( user.previewImage && user.previewImage.length > 1 && <img src={user.previewImage} onClick={openMenu} className='user-icon-img' />) || <i className="fas fa-user-circle fa-2xl user-icon" onClick={openMenu} />}

      {showMenu && (
        <div className="profile-dropdown">
          <div>
            <Link to={`/users/${user.id}`}>Profile</Link>
          </div>
          <div>
          <Link to={'/settings'}>Settings</Link>
          </div>
          <div>
            <p className="logout" onClick={logout}>Log Out</p>
          </div>
        </div>
      )}
    </div>

  );
}

export default ProfileButton;
