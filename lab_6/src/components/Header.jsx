import "../css/Header.css";
import logo from "../images/SnowPeak Gear logo.png";

export function Header() {
    return (
        <header>
            <img src={logo} alt="logo" />
            <div className="header-buttons">
                <button onClick={() => {}}>Home</button>
                <button onClick={() => {}}>Catalog</button>
                <button onClick={() => {}}>Cart</button>
            </div>
        </header>
    );
}
