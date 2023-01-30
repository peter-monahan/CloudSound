import './CreateEdit.css';
import { Link } from 'react-router-dom';

function CreateEdit() {


  return (
    <div className="create-edit">
      <Link title='Create Song' className="create-song edit-item" to={'/songs/create'}>
        <i className="fa-solid fa-plus fa-sm plus"></i>
        <i className="fa-solid fa-music fa-xl create-music-icon"></i>
      </Link>

      <Link title='Create Album' className="create-album edit-item" to={'/albums/create'}>
        <i className="fa-solid fa-plus fa-sm plus"></i>
        <i className="fa-solid fa-compact-disc fa-xl create-album-icon"></i>
      </Link>

      {/* <Link title='Create Playlist' className="create-playlist edit-item" to={'/playlists/create'}>
        <i className="fa-solid fa-plus fa-sm plus"></i>
        <i className="fa-solid fa-list fa-xl create-playlist-icon"></i>
      </Link>

      <Link title='Edit User' className="edit-user edit-item" to={'/edit'}>
        <i className="fa-solid fa-user-pen fa-xl edit-user-icon"></i>
      </Link> */}
    </div>
  );
}

export default CreateEdit;
