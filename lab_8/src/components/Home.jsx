import skiEuipment from "../images/ski_equipment.jpg";
import  EquimpmentExamples  from "./EquipmentExamples.jsx";
import "../css/Home.css"
import { useState } from "react";
import { VievMore } from "./VievMore.jsx";


export function Home() {

    const [showMore, setShowMore] = useState(false)

    const handleShowMore = () => {
        setShowMore(!showMore);
    };
    
    return(
        <>

        <div className="FirstArea">
            <img src={skiEuipment} alt="ski equipment" />
            <div className="RightArea">
            <h1>We offer the best ski equipment</h1>

            <p>"Our company is dedicated to providing top-quality ski equipment that combines performance, durability, and comfort.
                Whether you're a beginner or an experienced skier, our expertly selected gear ensures a safe and enjoyable experience 
                on the slopes. We prioritize customer satisfaction and offer personalized guidance to help you find the perfect fit for
                your winter adventures."</p>
            </div>
        </div>

        <div className="SecondArea">
            <EquimpmentExamples/>

            <button onClick={handleShowMore}>
                {showMore? 'View less': 'View more'}
            </button>
      
            {showMore && (<VievMore/>)}
        
        </div>        
        
        </>
    )
}