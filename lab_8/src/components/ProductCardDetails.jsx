import "../css/ProductCardDetails.css"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import data from "../data/products.json"

export function ProductCardDetails() {
    
    const {productId} = useParams()
    const [product, setProduct] = useState(null)

    useEffect(() => {
        // Знаходимо продукт за його ID з `products.json`
        const foundProduct = data.find((item) => item.id === productId);
        setProduct(foundProduct);
    }, [productId]);
    
    if (!product) {
        return <div>Product not found</div>;
    }

    return(
        <div className="ProductCardDetails">
            <img src={product.image} alt={product.name} />
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p>{product.price}</p>
            <p>{product.type}</p>

        </div>
    )
}