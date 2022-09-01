import { Link } from 'react-router-dom';
import './MiniShow.css';


function MiniShow ({title, image, to}) {


  return (
    <Link className="mini-show" to={to}>
      <img src={image} className='mini-image'/>
      <div>
        <p>{title}</p>
      </div>
    </Link>
  );
}

export default MiniShow;
