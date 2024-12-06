import "../css/EquipmentCard.css"

function EquipmentCard({ image, name }) {

    return (
        <div className="EquipmentCard">
            <img alt="imag" src={image} />
            <p>{name}</p>
        </div>
    );
}

export default EquipmentCard;
