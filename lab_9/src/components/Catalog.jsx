import React, { useState, useEffect } from "react";
import "../css/Catalog.css";
import ProductCard from "./ProductCard";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";
import { fetchProducts } from "../api/productsApi";

export function Catalog() {
  const [products, setProducts] = useState([]);
  const [selectedType, setSelectedType] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = {
          type: selectedType,
          minPrice: priceRange[0] || 0,
          maxPrice: priceRange[1] || 1000,
          searchQuery: searchQuery.trim(),
        };
        const productsData = await fetchProducts(params);
        setProducts(productsData);
      } catch (err) {
        console.error("Помилка при завантаженні продуктів:", err);
        setError("Помилка при завантаженні товарів. Спробуйте ще раз.");
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, [selectedType, priceRange, searchQuery]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <div>
        <div style={{ color: "red" }}>{error}</div>
        {/* Фільтри залишаються доступними навіть при помилці */}
        <Filters {...{ selectedType, setSelectedType, priceRange, setPriceRange, searchQuery, setSearchQuery }} />
      </div>
    );
  }

  return (
    <div>
      <Filters {...{ selectedType, setSelectedType, priceRange, setPriceRange, searchQuery, setSearchQuery }} />
      <div className="Catalog">
        {products.length === 0 ? (
          <h1>На жаль, спорядження за заданими критеріями не знайдено.</h1>
        ) : (
          products.map((item) => (
            <Link to={`/catalog/product/${item._id}`} className="product-link" key={item._id}>
              <ProductCard
                image={item.image_link}
                name={item.name}
                description={item.description}
                price={item.price}
                type={item.type}
                status={item.is_rented}
              />
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

function Filters({ selectedType, setSelectedType, priceRange, setPriceRange, searchQuery, setSearchQuery }) {
  return (
    <div className="Filters">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search..."
      />
      <button onClick={() => setSelectedType("all")}>All</button>
      <button onClick={() => setSelectedType("skis")}>Skis</button>
      <button onClick={() => setSelectedType("snowboard")}>Snowboards</button>
      <button onClick={() => setSelectedType("gloves")}>Gloves</button>
      <button onClick={() => setSelectedType("skis_stick")}>Skis Sticks</button>
      <label>Price:</label>
      <input
        type="range"
        min="0"
        max="1000"
        value={priceRange[1]}
        onChange={(e) => setPriceRange([0, Number(e.target.value)])}
      />
      <span>{priceRange[1]} грн</span>
    </div>
  );
}
