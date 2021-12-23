import { useEffect, useState, useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '_provider/AuthProvider';
import { RecapContext } from '_provider/RecapProvider';
import firebaseDB from '_firebaseconn/firebase.config';
import ShoppingList from "../components/ShoppingList";
import ShoppingForm from "components/ShoppingForm";

const Home = () => {
    const outcomeDB = firebaseDB.firestore().collection('pengeluaran');
    const currentUser = useContext(AuthContext);
    const recap = useContext(RecapContext);

    const [data, setData ] = useState([]);
    const [dailyTotal, setDailyTotal] = useState(0);

    const getShoppingList = () => {
        outcomeDB
            .where('userId', '==', currentUser.uid)
            .where('createdAt', '==', new Date().toISOString().split('T')[0])
            .orderBy('time', 'desc')
            .onSnapshot(response => {
                const data = [];
                let total = 0;
                response.forEach(element => {
                    const item = element.data();
                    item.price_label = parseFloat(item.price).toLocaleString('id-ID', {minimumFractionDigits: 0});
                    data.push(item);
                    total += (parseFloat(item.price));
                });
                setData(data);
                setDailyTotal(total.toLocaleString('id-ID', {minimumFractionDigits: 0}));
            })
    }

    useEffect(() => {
        let mounted = true;
        if (mounted) {
            getShoppingList();
        }

        return () => {
            mounted = false;
        }
    }, []);

    return (
        <div className="fitwidth">
            <div className="summary-box">
                <div className="box box-6 daily">
                    <FontAwesomeIcon icon={faClock} />
                    <div>
                        <label>Hari Ini</label>
                        <p>{dailyTotal}</p>
                    </div>
                </div>
                <div className="box box-6 monthly">
                    <FontAwesomeIcon icon={faCalendar} />
                    <div>
                        <label>Bulan Ini</label>
                        <p>{Number(recap?.total).toLocaleString('id-ID', {minimumFractionDigits: 0})}</p>
                    </div>
                </div>
            </div>
            <ShoppingForm title="Yuk, catat pengeluaran hari ini!"/>
            <h4>Pengeluaran hari ini</h4>
            <div className="shopping-list-container">
                <ShoppingList data={data} deleteable={true} />
            </div>
        </div>
     );
}
 
export default Home;