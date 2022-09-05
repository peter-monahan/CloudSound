import './ItemDetail.css';


function ItemDetail ({title, image, details=[]}) {


  return (
    <div className="item-detail">
      <img src={image} className='item-image'/>
      <div className='item-details'>
        <h2>{title}</h2>
        <ul>{details.map((detail, i) => <li key={i}>{detail}</li>)}</ul>
      </div>
    </div>
  );
}

export default ItemDetail;
