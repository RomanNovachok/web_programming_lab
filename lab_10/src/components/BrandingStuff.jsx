import social_medias from "../images/social_medias.png";
import logo from "../images/SnowPeak Gear logo.png";
import "../css/BrandingStuff.css"


export function BrandingStuff() {
    return(

        <>
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