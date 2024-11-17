import data from "../data/data.json"

import EquipmentCard from "./EquipmentCard";

import "../css/EquipmentExamples.css"


function EquimpmentExamples() {

    return(
         <div className="EquimpmentExamples" >
        
        {data.map((item, index) => (
            <div className="" key={index}>
                <EquipmentCard
                    image={item.image}
                    name={item.name}
                />
            </div>
        ))}
    
</div>)
   

}

export default EquimpmentExamples;
