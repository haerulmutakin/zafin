import React from "react";

const SurveyList = ({data, deleteable = true, onDelete}) => {
    return ( 
        <React.Fragment>
            <div className="sl-items">
                {data.map((item) => (
                    <div key={item.id} className="sl-item">
                        <div className="item-info">
                            <p>{item.name}</p>
                            <p className="item-price">{item.seller}</p>
                            <p className="item-price">Rp. {item.price_label}</p>
                        </div>
                        {deleteable && <span className="btn-del" onClick={() => onDelete(item.id)}>&#10005;</span> }
                    </div>
                ))}
            </div>
        </React.Fragment>
     );
}
 
export default SurveyList;