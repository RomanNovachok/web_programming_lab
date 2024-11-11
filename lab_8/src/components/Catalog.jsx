// Catalog.jsx
import React, { useState } from "react";
import "../css/Catalog.css";
import data from "../data/products.json";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";

export function Catalog() {
  const [selectedType, setSelectedType] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 1000]); // Діапазон цін
  const [searchQuery, setSearchQuery] = useState(""); // Стан для пошукового запиту

  // Фільтруємо продукти на основі типу, ціни та пошукового запиту
  const filteredData = data.filter(item => 
    (selectedType === "all" || item.type === selectedType) &&
    item.price >= priceRange[0] && item.price <= priceRange[1] &&
    (item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
     item.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div>
      {/* Пошук і фільтри */}
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

      {/* Каталог продуктів */}
      <div className="Catalog">
        {filteredData.map((item, index) => (
            <Link to={`/catalog/product/${item.id}`} className="product-link">
            <ProductCard
                key={index}
                image={item.image}
                name={item.name}
                description={item.description}
                price={item.price}
                type={item.type}
                status={item.status}
            />
            </Link>

        ))}
      </div>
    </div>
  );
}
