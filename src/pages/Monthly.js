import { useState, useEffect, useContext } from "react";
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '_provider/AuthProvider';
import { RecapContext } from '_provider/RecapProvider';
import { firebaseDB } from '_firebaseconn/firebase.config';
import ShoppingList from "../components/ShoppingList";

const Graph = () => {
    const outcomeDB = collection(firebaseDB, 'pengeluaran');
    const currentUser = useContext(AuthContext);
    const recap = useContext(RecapContext);
    
    const [data, setData ] = useState({});

    const getMonthlyReport = async () => {
        const date = new Date();

        const q = query(
            outcomeDB,
            orderBy('time', 'desc'),
            where('userId', '==', currentUser.uid),
            where('time', '>=', new Date(date.getFullYear(), date.getMonth(), 1).getTime()),
            where('time', '<=', new Date(date.getFullYear(), date.getMonth() + 1, 0).getTime())
        );

        const querySnapshoot = await getDocs(q);
        const docs = querySnapshoot.docs;
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const group = docs.reduce((obj, item) => {
            const itemData = item.data();
            const localeDate = new Date(itemData.createdAt).toLocaleDateString('id-ID', options);
            if (!obj[localeDate]) {
                obj[localeDate] = {data: [], total: 0};
            }
            obj[localeDate]['total'] += Number(itemData.price);
            obj[localeDate]['data'].push(itemData);
            return obj;
        }, {});
        setData(group);
    }

    useEffect(() => {
        getMonthlyReport();
    }, []);
    return ( 
        <div className="fitwidth">
            <div className="summary-box">
                <div className="box box-12 monthly">
                    <FontAwesomeIcon icon={faCalendar} />
                    <div>
                        <label>Bulan Ini</label>
                        <p>Rp. {Number(recap?.total).toLocaleString('id-ID', {minimumFractionDigits: 0})}</p>
                    </div>
                </div>
            </div>
            <h4>Pengeluaran bulan ini</h4>
            <div className="monthly-shopping-container">
                {Object.keys(data).map((key) => (
                    <div key={key}>
                        <div className="shopping-date">
                            <span>{key}</span>
                            <span>Rp. {data[key]['total'].toLocaleString('id-ID', {minimumFractionDigits: 0})}</span>
                        </div>
                        <ShoppingList data={data[key]['data']} deleteable={true} />
                    </div>
                ))}
                
            </div>
        </div>
     );
}
 
export default Graph;