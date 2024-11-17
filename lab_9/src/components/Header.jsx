import "../css/Header.css";
import logo from "../images/SnowPeak Gear logo.png";
import { Link } from "react-router-dom";


export function Header() {
    return (
        <header>
            <img src={logo} alt="logo" />
            <div className="header-buttons">
                <Link to="/">Home</Link>
                <Link to="/catalog">Catalog</Link>
                <Link to="/cart">Cart</Link>
            </div>
        </header>
    );
}
