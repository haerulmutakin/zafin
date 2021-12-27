import { useState, useEffect, useContext } from "react";
import { collection, onSnapshot, query, where, orderBy } from 'firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '_provider/AuthProvider';
import { RecapContext } from '_provider/RecapProvider';
import { firebaseDB } from '_firebaseconn/firebase.config';
import ShoppingList from "../components/ShoppingList";

const Graph = () => {
    let unsubscribe;
    const outcomeDB = collection(firebaseDB, 'pengeluaran');
    const currentUser = useContext(AuthContext);
    const recap = useContext(RecapContext);
    
    const [data, setData ] = useState({});

    const getMonthlyReport = () => {
        const date = new Date();

        const q = query(
            outcomeDB,
            orderBy('time', 'desc'),
            where('userId', '==', currentUser.uid),
            where('time', '>=', new Date(date.getFullYear(), date.getMonth(), 1).getTime()),
            where('time', '<=', new Date(date.getFullYear(), date.getMonth() + 1, 0).getTime())
        );

        unsubscribe = onSnapshot(q, (doc) => {
            const docs = doc.docs;
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            const group = docs.reduce((obj, item) => {
                const itemData = item.data();
                const localeDate = new Date(itemData.createdAt).toLocaleDateString('id-ID', options);
                if (!obj[localeDate]) {
                    obj[localeDate] = [];
                }
                obj[localeDate].push(itemData);
                return obj;
            }, {});
            setData(group);
        });
    }

    useEffect(() => {
        getMonthlyReport();
        return () => unsubscribe();
    }, []);
    return ( 
        <div className="fitwidth">
            <div className="summary-box">
                <div className="box box-6 monthly">
                    <FontAwesomeIcon icon={faCalendar} />
                    <div>
                        <label>Bulan Ini</label>
                        <p>{Number(recap?.total).toLocaleString('id-ID', {minimumFractionDigits: 0})}</p>
                    </div>
                </div>
            </div>
            <h4>Pengeluaran bulan ini</h4>
            <div className="monthly-shopping-container">
                {Object.keys(data).map((key) => (
                    <div key={key}>
                        <div className="shopping-date">{key}</div>
                        <ShoppingList data={data[key]} />
                    </div>
                ))}
                
            </div>
        </div>
     );
}
 
export default Graph;