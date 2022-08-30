import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";

import './UserPage.css';

function UserPage () {
  const {userId} = useParams();

  return (
    <div className="user-page">

    </div>
  );
}

export default UserPage;
