import { useContext } from 'react';
import { setDoc, doc, deleteDoc } from 'firebase/firestore';
import { firebaseDB } from '_firebaseconn/firebase.config';
import { RecapContext } from '_provider/RecapProvider';

const ShoppingList = ({data, deleteable = false, onDelete}) => {
    const recap = useContext(RecapContext);

    const handleDelete = (data) => {
        deleteDoc(doc(firebaseDB, 'pengeluaran', data.id));
        updateRecap(data);
    }

    const updateRecap = (data) => {
        const recapPayload = recap;
        const total = Number(recapPayload.total) - Number(data.price.replaceAll('.', ''));
        recapPayload.total = total.toString();

        const ref = doc(firebaseDB, 'rekap', recapPayload.id);
        setDoc(ref, recapPayload);
        onDelete();
    }
    return ( 
        <div className="shopping-list">
            <div className="sl-items">
                {data.map((item) => (
                    <div key={item.id} className="sl-item">
                        <div className="item-info">
                            <p>{item.name}</p>
                            <p className="item-price">Rp. {Number(item?.price).toLocaleString('id-ID', {minimumFractionDigits: 0})}</p>
                        </div>
                        {deleteable && <span className="btn-del" onClick={() => handleDelete(item)}>&#10005;</span> }
                    </div>
                ))}
            </div>
        </div>
     );
}
 
export default ShoppingList;