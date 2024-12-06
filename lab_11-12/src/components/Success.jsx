import React from "react";
import { Link } from "react-router-dom";
import "../css/Success.css";

export function Success() {
    return (
        <div className="success-container">
            <h1>Thank you for your purchase!</h1>
            <p>Your order has been placed successfully.</p>
            <Link to="/" className="return-home">
                Return to Home
            </Link>
        </div>
    );
}
