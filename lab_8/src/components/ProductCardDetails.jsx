import "../css/ProductCardDetails.css"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import data from "../data/products.json"

export function ProductCardDetails() {
    
    const {productId} = useParams()
    const [product, setProduct] = useState(null)
    const [message, setMessage] = useState(null)

    function ShowMessage() {
        setMessage("Equipment successfully added to cart!")

        setTimeout(() => {
            setMessage(null);
        }, 3000);
        
    }

    useEffect(() => {
        // Знаходимо продукт за його ID з `products.json`
        const foundProduct = data.find((item) => item.id === productId);
        setProduct(foundProduct);
    }, [productId]);
    
    if (!product) {
        return <div>Product not found</div>;
    }

    return(
        <div className="product-card-details-content">
        <div className="message-about-add-to-cart">
        {message&&
        <p style={{
            padding: "5px 10px",
            fontSize: "25px",
            color: "rgb(100,100,100, 0.3)",
            backgroundColor: "rgb(215,215,215, 0.7)",
            borderRadius: "5px"
        }}>{message}</p>
        }
        </div>
        <div className="ProductCardDetails">
            <div className="product-card-details-image"><img src={product.image} alt={product.name} /></div>
            <div className="product-card-details-right-area">
                <h1>{product.name}</h1>
                <p>Category: {product.type}</p>
                <p>{product.description}</p>
                <p>Price: {product.price} грн</p>
                <button onClick={() => {ShowMessage()}}>Add to cart</button>
            </div>

        </div>
        </div>

    )
}