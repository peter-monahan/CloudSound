import { Link } from 'react-router-dom';
import './MiniShow.css';


function MiniShow ({title, image, to, size='medium'}) {


  return (
    <Link className={`mini-show-${size}`} to={to}>
      <img src={image} className={`mini-image-${size}`}/>
      <div>
        <p>{title}</p>
      </div>
    </Link>
  );
}

export default MiniShow;
