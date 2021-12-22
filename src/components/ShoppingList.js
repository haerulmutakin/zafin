const ShoppingList = ({data, onDelete}) => {
    return ( 
        <div className="shopping-list">
            <h4>Pengeluaran hari ini</h4>
            <div className="sl-items">
                {data.map((item) => (
                    <div key={item.id} className="sl-item">
                        <div className="item-info">
                            <p>{item.name}</p>
                            <p className="item-price">{item.price_label}</p>
                        </div>
                        <span className="btn-del" onClick={() => onDelete(item.id)}>&#10005;</span>
                    </div>
                ))}
            </div>
        </div>
     );
}
 
export default ShoppingList;