import './ItemEdit.css';
import { Link } from 'react-router-dom';

function ItemEdit({itemName, to}) {


  return (
    <div className="item-edit">
      <Link className="edit-item" to={to}>
        <div className='edit-icon'>
        <i className={`fa-solid fa-${itemName} fa-xl `}></i>
        </div>
        <div className='pen'>
        <i className="fa-solid fa-square-pen "></i>
        </div>
      </Link>
    </div>
  );
}

export default ItemEdit;
