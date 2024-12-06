import "../css/Header.css";
import logo from "../images/SnowPeak Gear logo.png";
import { Link, useNavigate } from "react-router-dom";

export function Header({ isAuthenticated, setIsAuthenticated }) {
    const navigate = useNavigate();

    const handleSignOut = () => {
        localStorage.removeItem("activeUser");
        setIsAuthenticated(false);
        navigate("/login");
    };

    return (
        <header>
            <img src={logo} alt="logo" />
            <div className="header-buttons">
                <Link to="/">Home</Link>
                <Link to="/catalog">Catalog</Link>
                <Link to="/cart">Cart</Link>
            </div>
            <div>
                {isAuthenticated ? (
                    <button className="auth-button" onClick={handleSignOut}>
                        Sign Out
                    </button>
                ) : (
                    <Link to="/login" className="auth-button">
                        Sign In
                    </Link>
                )}
            </div>
        </header>
    );
}
