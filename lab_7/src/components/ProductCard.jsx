import "../css/ProductCard.css"

function ProductCard({ image, name, description,price }) {
    return (
        <div className="ProductCard">
            <img alt="imag" src={image} />
            <div className="Text">
                <p id="Name">{name}</p>
                <p>{description}</p>
                <p><b>Price:</b> {price} грн</p>
            </div>
        </div>
    );
}

export default ProductCard;
