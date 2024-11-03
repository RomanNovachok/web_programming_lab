import "../css/Catalog.css"
import data from "../data/products.json"
import ProductCard from "./ProductCard"

export function Catalog() {
    return(
        <div className="Catalog" >
       
        {data.map((item, index) => (
            <div className="" key={index}>
                <ProductCard
                    image={item.image}
                    name={item.name}
                    description={item.description}
                    price={item.price}
                />
            </div>
        ))}

        </div>
)
}