import { useEffect, useState, useContext } from "react";
import { collection, query, getDocs, where, orderBy } from 'firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { firebaseDB } from '_firebaseconn/firebase.config';
import { AuthContext } from '_provider/AuthProvider';
import { RecapContext } from '_provider/RecapProvider';
import ShoppingList from "../components/ShoppingList";
import ShoppingForm from "components/ShoppingForm";

const Home = () => {
    const outcomeDB = collection(firebaseDB, 'pengeluaran');
    const currentUser = useContext(AuthContext);
    const recap = useContext(RecapContext);

    const [data, setData ] = useState([]);
    const [dailyTotal, setDailyTotal] = useState(0);

    const getShoppingList = async () => {
        const q = query(outcomeDB, orderBy('time', 'desc'), where('userId', '==', currentUser.uid), where('createdAt', '==', new Date().toISOString().split('T')[0]));
        const querySnapshoot = await getDocs(q);
        const docs = querySnapshoot.docs;
        const data = [];
        let total = 0;
        docs.forEach(element => {
            const item = element.data();
            data.push(item);
            total += (parseFloat(item.price));
        });
        setData(data);
        setDailyTotal(total.toLocaleString('id-ID', {minimumFractionDigits: 0}));
    }

    useEffect(() => {
        getShoppingList();
    }, []);

    return (
        <div className="fitwidth">
            <div className="summary-box">
                <div className="box box-6 daily">
                    <FontAwesomeIcon icon={faClock} />
                    <div>
                        <label>Hari Ini</label>
                        <p>Rp. {dailyTotal}</p>
                    </div>
                </div>
                <div className="box box-6 monthly">
                    <FontAwesomeIcon icon={faCalendar} />
                    <div>
                        <label>Bulan Ini</label>
                        <p>Rp. {Number(recap?.total).toLocaleString('id-ID', {minimumFractionDigits: 0})}</p>
                    </div>
                </div>
            </div>
            <ShoppingForm title="Yuk, catat pengeluaran hari ini!" onDataAdded={getShoppingList}/>
            <h4>Pengeluaran hari ini, { new Date().toLocaleDateString('id-ID', {year: 'numeric', month: 'long', day: 'numeric'}) }</h4>
            <div className="shopping-list-container">
                <ShoppingList data={data} deleteable={true} onDelete={getShoppingList} />
            </div>
        </div>
     );
}
 
export default Home;