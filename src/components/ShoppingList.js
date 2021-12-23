import { useContext } from 'react';
import firebaseDB from '_firebaseconn/firebase.config';
import { RecapContext } from '_provider/RecapProvider';

const ShoppingList = ({data, deleteable = false}) => {
    const outcomeDB = firebaseDB.firestore().collection('pengeluaran');
    const recapDB = firebaseDB.firestore().collection('rekap');
    const recap = useContext(RecapContext);

    const handleDelete = (data) => {
        outcomeDB.doc(data.id).delete();
        updateRecap(data);
    }

    const updateRecap = (data) => {
        const recapPayload = recap;
        const total = Number(recapPayload.total) - Number(data.price.replaceAll('.', ''));
        recapPayload.total = total.toString();
        recapDB
            .doc(recapPayload.id)
            .update(recapPayload);
    }
    return ( 
        <div className="shopping-list">
            <div className="sl-items">
                {data.map((item) => (
                    <div key={item.id} className="sl-item">
                        <div className="item-info">
                            <p>{item.name}</p>
                            <p className="item-price">{item.price_label}</p>
                        </div>
                        {deleteable && <span className="btn-del" onClick={() => handleDelete(item)}>&#10005;</span> }
                    </div>
                ))}
            </div>
        </div>
     );
}
 
export default ShoppingList;