import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateQuantity } from "../redux/actions";
import "../css/Cart.css";
import { Link } from "react-router-dom";

export function Cart() {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);

    const handleQuantityChange = (_id, newQuantity) => {
        dispatch(updateQuantity(_id, newQuantity));
    };

    const totalAmount = cartItems.reduce((total, item) => {
        if (item.quantity > 0) {
            const price = Number(item.price) || 0; // Перевірка та перетворення price
            const quantity = item.quantity; // Використання реальної кількості
            return total + price * quantity;
        }
        return total;
    }, 0);
    
    console.log("Total Amount:", totalAmount); // Перевірка обчислення

    if (!cartItems.length) {
        return <div className="cart-container">Your cart is empty.</div>;
    }

    console.log(cartItems);

    return (
        <div className="cart-container">
            <h1 className="cart-title">Shopping Cart</h1>
            {cartItems.map((item) => (
                <div key={item._id} className="cart-item">
                    <img
                        src={item.image_link || "placeholder.jpg"}
                        alt={item.name}
                        className="cart-item-image"
                    />
                    <h3 className="cart-item-name">{item.name}</h3>
                    <div className="cart-item-controls">
                        <button
                            onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                        >
                            -
                        </button>
                        <span className="cart-item-quantity">{item.quantity}</span>
                        <button className="cart-item-quanity-increase"
                            onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                        >
                            +
                        </button>
                    </div>
                    <p className="cart-item-price">
                        {(Number(item.price || 0) * (item.quantity > 0 ? item.quantity : 0)).toFixed(2)} грн
                    </p>
                </div>
            ))}
            <h2 className="cart-total">Total amount: {totalAmount.toFixed(2)} грн</h2>
            <div className="cart-buttons">
                <Link to="/catalog" className="back">Back to Catalog</Link>
                <Link to="/checkout" className="continue">Continue</Link>

            </div>
        </div>
    );
}
