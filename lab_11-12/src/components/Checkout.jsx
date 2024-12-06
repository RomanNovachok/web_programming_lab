import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCart } from "../redux/actions"; // Імпортуємо дію для очищення кошика
import "../css/Checkout.css";

export function Checkout() {
    const navigate = useNavigate();
    const dispatch = useDispatch(); // Діспетчер для виклику дій Redux

    const initialValues = {
        name: "",
        email: "",
        address: "",
        city: "",
        postalCode: "",
        cardNumber: "",
        expiryDate: "",
        cvv: "",
    };

    const validationSchema = Yup.object({
        name: Yup.string().required("Name is required"),
        email: Yup.string()
            .email("Invalid email format")
            .required("Email is required"),
        address: Yup.string().required("Address is required"),
        city: Yup.string().required("City is required"),
        postalCode: Yup.string()
            .matches(/^\d{5}$/, "Must be exactly 5 digits")
            .required("Postal code is required"),
        cardNumber: Yup.string()
            .matches(/^\d{16}$/, "Card number must be 16 digits")
            .required("Card number is required"),
        expiryDate: Yup.string()
            .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Invalid expiry date (MM/YY)")
            .required("Expiry date is required"),
        cvv: Yup.string()
            .matches(/^\d{3}$/, "CVV must be 3 digits")
            .required("CVV is required"),
    });

    const handleSubmit = (values) => {
        console.log("Form data:", values);
        dispatch(clearCart()); // Очищення кошика
        navigate("/success"); // Перехід до сторінки успіху
    };

    return (
        <div className="checkout-container">
            <h1>Checkout</h1>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                <Form className="checkout-form">
                    <div>
                        <label htmlFor="name">Name</label>
                        <Field type="text" id="name" name="name" />
                        <ErrorMessage name="name" component="div" className="error" />
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <Field type="email" id="email" name="email" />
                        <ErrorMessage name="email" component="div" className="error" />
                    </div>
                    <div>
                        <label htmlFor="address">Address</label>
                        <Field type="text" id="address" name="address" />
                        <ErrorMessage name="address" component="div" className="error" />
                    </div>
                    <div>
                        <label htmlFor="city">City</label>
                        <Field type="text" id="city" name="city" />
                        <ErrorMessage name="city" component="div" className="error" />
                    </div>
                    <div>
                        <label htmlFor="postalCode">Postal Code</label>
                        <Field type="text" id="postalCode" name="postalCode" />
                        <ErrorMessage
                            name="postalCode"
                            component="div"
                            className="error"
                        />
                    </div>
                    <div>
                        <label htmlFor="cardNumber">Card Number</label>
                        <Field type="text" id="cardNumber" name="cardNumber" />
                        <ErrorMessage
                            name="cardNumber"
                            component="div"
                            className="error"
                        />
                    </div>
                    <div>
                        <label htmlFor="expiryDate">Expiry Date (MM/YY)</label>
                        <Field type="text" id="expiryDate" name="expiryDate" />
                        <ErrorMessage
                            name="expiryDate"
                            component="div"
                            className="error"
                        />
                    </div>
                    <div>
                        <label htmlFor="cvv">CVV</label>
                        <Field type="text" id="cvv" name="cvv" />
                        <ErrorMessage name="cvv" component="div" className="error" />
                    </div>
                    <button type="submit">Submit</button>
                </Form>
            </Formik>
        </div>
    );
}
