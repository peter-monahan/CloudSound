import { Link } from 'react-router-dom';
import './AlbumMiniShow.css';


function AlbumMiniShow ({album, size='medium'}) {


  return (
    <Link className={`mini-show-${size}`} to={`/albums/${album.id}`}>
      <img src={album.previewImage} className={`mini-image-${size}`}/>
      <div>
        <p>{album.title}</p>
      </div>
    </Link>
  );
}

export default AlbumMiniShow;
