import logo from "../images/SnowPeak Gear logo.png";
import social_medias from "../images/social_medias.png";
import skiEuipment from "../images/ski_equipment.jpg";

import  EquimpmentExamples  from "./EquipmentExamples.jsx";
import "../css/Home.css"

export function Home() {
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

            <button onClick={() => {}}>Catalog</button>
            
        </div>        
        
        <div className="BrandingStuff">
            <div className="LeftTextArea">
                <h1>Branding stuff</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Vestibulum condimentum id ex quis varius. Ut faucibus ornare quam, sed finibus felis molestie non.</p>
            </div>
            
            <img id="Logo" src={logo} alt="logo" />
            <img src={social_medias} alt="social medias" />

        </div>

        </>
    )
}