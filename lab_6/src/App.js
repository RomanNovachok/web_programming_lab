import { Header } from "./components/Header";
import { Catalog } from "./components/Catalog";
import { Footer } from "./components/Footer";
import { Home } from "./components/Home";
import "./css/App.css";

function App() {
    return (
        <div className="page-container">
            <Header />
            <div className="content">
                <Home/>
                <Catalog/>
            </div>
            <Footer />
        </div>
    );
}

export default App;
