import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import firebaseDB from '_firebaseconn/firebase.config';
import ShoppingList from "../components/ShoppingList";

const Graph = () => {
    const projectsDB = firebaseDB.firestore().collection('pengeluaran');
    const [data, setData ] = useState([]);
    const [monthlyTotal, setMonthlyTotal] = useState(0);

    const getMonthlyReport = () => {
        const date = new Date();
        projectsDB
            .where('time', '>=', new Date(date.getFullYear(), date.getMonth(), 1).getTime())
            .where('time', '<=', new Date(date.getFullYear(), date.getMonth() + 1, 0).getTime())
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
                setMonthlyTotal(total.toLocaleString('id-ID', {minimumFractionDigits: 0}));
            })
    }

    useEffect(() => {
        getMonthlyReport();
    }, []);
    return ( 
        <div className="fitwidth">
            <div className="summary-box">
                <div className="box box-6 monthly">
                    <FontAwesomeIcon icon={faCalendar} />
                    <div>
                        <label>Bulan Ini</label>
                        <p>{monthlyTotal}</p>
                    </div>
                </div>
            </div>
            <ShoppingList title="Pengeluaran bulan ini" data={data} />
        </div>
     );
}
 
export default Graph;