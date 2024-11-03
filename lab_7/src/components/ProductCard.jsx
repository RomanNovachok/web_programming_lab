import "../css/ProductCard.css"

function ProductCard({ image, name, description,price }) {
    return (
        <div className="ProductCard">
            <img alt="imag" src={image} />
            <p>{name}</p>
            <p>{description}</p>
            <p>{price}</p>
        </div>
    );
}

export default ProductCard;
