import "../css/ProductCardDetails.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchProductDetails } from "../api/productsApi";

export function ProductCardDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const showMessage = () => {
    setMessage("Equipment successfully added to cart!");
    setTimeout(() => setMessage(null), 3000);
  };

  useEffect(() => {
    const loadProductDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const productData = await fetchProductDetails(productId);
        setProduct(productData);
      } catch (err) {
        console.error("Error fetching product details:", err);
        setError("Product not found or server error.");
      } finally {
        setLoading(false);
      }
    };
    loadProductDetails();
  }, [productId]);

  if (loading) return <div>Завантаження...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="product-card-details-content">
      {message && (
        <div className="message-about-add-to-cart">
          <p className="add-to-cart-message">{message}</p>
        </div>
      )}
      <div className="ProductCardDetails">
        <div className="product-card-details-image">
          <img src={product.image_link} alt={product.name} />
        </div>
        <div className="product-card-details-right-area">
          <h1>{product.name}</h1>
          <p>Category: {product.type}</p>
          <p>{product.description}</p>
          <p>Price: {product.price} грн</p>
          <button onClick={showMessage}>Add to cart</button>
        </div>
      </div>
    </div>
  );
}
