import "../css/ProductCard.css";

function ProductCard({ image, name, description, price, type, status }) {
  return (
    <div className="ProductCard">
        
        <div className="image"> <img alt="imag" src={image} /> </div>
        <div className="Text">
            <p id="Name">{name}</p>
            <p>{description}</p>
            <p><b>Price:</b> {price} грн</p>
        </div>
    </div>
  );
}

export default ProductCard;
