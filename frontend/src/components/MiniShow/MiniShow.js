import './MiniShow.css';


function MiniShow ({title, image}) {


  return (
    <div className="mini-show">
      <img src={image} className='mini-image'/>
      <div>
        <p>{title}</p>
      </div>
    </div>
  );
}

export default MiniShow;
