import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { setUser, getUser } from "../../../store/display";

import './UserPage.css';

function UserPage () {
  const dispatch = useDispatch();
  const {userId} = useParams();
  const sessionUser = useSelector(state => state.session.user);
  const displayUser = useSelector(state => state.display.user);

  const [owned, setOwned] = useState(false);

  useEffect(() => {
    if(sessionUser && sessionUser.id === Number(userId)) {
      dispatch(setUser(sessionUser));
      setOwned(true);
    } else {
      dispatch(getUser(userId));
    }
  }, [sessionUser, userId]);


  return (
    <div className="user-page">
      <div className="user-detail">
      <img src={displayUser.previewImage || 'https://play-lh.googleusercontent.com/LDBkbGDP2I8RH4MGcRMPkgIB1R4Nl7MHxLcbYvOmjB5tEj6xrklDRUju6B2BA_B5hbg'} className='user-image'/>
      <h2>{displayUser.username}</h2>
      </div>
    </div>
  );
}

export default UserPage;
