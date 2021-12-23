import { useEffect, useState, useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '_provider/AuthProvider';
import firebaseDB from '_firebaseconn/firebase.config';
import ShoppingList from "../components/ShoppingList";
import ShoppingForm from "components/ShoppingForm";

const Home = () => {
    const outcomeDB = firebaseDB.firestore().collection('pengeluaran');
    const currentUser = useContext(AuthContext);

    const [data, setData ] = useState([]);
    const [dailyTotal, setDailyTotal] = useState(0);
    const [monthlyTotal, setMonthlyTotal] = useState(0);

    const getMonthlyReport = () => {
        const date = new Date();
        outcomeDB
            .where('userId', '==', currentUser.uid)
            .where('time', '>=', new Date(date.getFullYear(), date.getMonth(), 1).getTime())
            .where('time', '<=', new Date(date.getFullYear(), date.getMonth() + 1, 0).getTime())
            .onSnapshot(response => {
                let total = 0;
                response.forEach(element => {
                    const item = element.data();
                    total += (parseFloat(item.price));
                });
                setMonthlyTotal(total.toLocaleString('id-ID', {minimumFractionDigits: 0}));
            })
    }

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

    const handleDelete = (id) => {
        outcomeDB.doc(id).delete()
    }

    useEffect(() => {
        getShoppingList();
        getMonthlyReport();
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
                        <p>{monthlyTotal}</p>
                    </div>
                </div>
            </div>
            <ShoppingForm title="Yuk, catat pengeluaran hari ini!"/>
            <ShoppingList title="Pengeluaran hari ini" data={data} deleteable={true} onDelete={handleDelete} />
        </div>
     );
}
 
export default Home;