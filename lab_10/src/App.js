import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { Header } from "./components/Header";
import { Catalog } from "./components/Catalog";
import { Footer } from "./components/Footer";
import { Home } from "./components/Home";
import { Cart } from "./components/Cart";
import { ProductCardDetails } from "./components/ProductCardDetails";
import "./css/App.css";


function App() {
    return (
        <Router>
        <div className="page-container">
            <Header />
            <div className="content">
                <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/catalog" element={<Catalog />}></Route>
                <Route path="/cart" element={<Cart />}></Route>
                <Route path="/catalog/product/:productId" element={<ProductCardDetails />} />
                </Routes>
            </div>
            <Footer />
        </div>
        </Router>
    );
}

export default App;
