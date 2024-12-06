import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import "../css/Auth.css";

export function SignUp() {
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
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("Please confirm your password"),
    });

    const handleSubmit = (values) => {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const newUser = { email: values.email, password: values.password };

        if (users.some((user) => user.email === newUser.email)) {
            alert("Email already exists!");
            return;
        }

        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        alert("Account created successfully!");
        navigate("/login");
    };

    return (
        <div className="auth-container">
            <h2>Sign Up</h2>
            <Formik
                initialValues={{ email: "", password: "", confirmPassword: "" }}
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
                        <div>
                            <label>Confirm Password:</label>
                            <Field
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm your password"
                            />
                            <ErrorMessage
                                name="confirmPassword"
                                component="div"
                                className="error-message"
                            />
                        </div>
                        <button type="submit">Sign Up</button>
                    </Form>
                )}
            </Formik>
            <p>
                Already have an account? <Link to="/login">Log in here</Link>
            </p>
        </div>
    );
}
