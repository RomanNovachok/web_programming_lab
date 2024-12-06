import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import "../css/Auth.css";

export function Login({ setIsAuthenticated }) {
    const navigate = useNavigate();

    const validationSchema = Yup.object({
        email: Yup.string()
            .matches(
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                "Invalid email address"
            )
            .required("Email is required"),
        password: Yup.string()
            .min(6, "Password must be at least 6 characters long")
            .required("Password is required"),
    });

    const handleSubmit = (values) => {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find(
            (user) => user.email === values.email && user.password === values.password
        );

        if (user) {
            localStorage.setItem("activeUser", JSON.stringify(user));
            setIsAuthenticated(true); // Оновлюємо стан
            alert("Login successful!");
            navigate("/"); // Перенаправлення
        } else {
            alert("Invalid email or password. Please try again.");
        }
    };

    return (
        <div className="auth-container">
            <h2>Login</h2>
            <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {() => (
                    <Form>
                        <div>
                            <label>Email:</label>
                            <Field
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                            />
                            <ErrorMessage
                                name="email"
                                component="div"
                                className="error-message"
                            />
                        </div>
                        <div>
                            <label>Password:</label>
                            <Field
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                            />
                            <ErrorMessage
                                name="password"
                                component="div"
                                className="error-message"
                            />
                        </div>
                        <button type="submit">Sign In</button>
                    </Form>
                )}
            </Formik>
            <p>
                Don't have an account? <Link to="/signup">Sign up here</Link>
            </p>
        </div>
    );
}
