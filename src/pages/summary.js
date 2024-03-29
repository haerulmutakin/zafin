import { useState, useEffect, useContext } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { AuthContext } from '_provider/AuthProvider';
import { firebaseDB } from '_firebaseconn/firebase.config';
import YearSummary from "../components/YearSummary";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';

const Summary = () => {
    const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    const currentUser = useContext(AuthContext);
    const recapDB = collection(firebaseDB, 'rekap');

    const [data, setData] = useState({});
    const [yearlyTota, setYearlyTotal] = useState(0);

    const getRecap = async () => {
        const q = query(recapDB, where('tahun', '==', new Date().toLocaleDateString('id-ID', {year: 'numeric'})), where('userId', '==', currentUser.uid));

        const querySnapshoot = await getDocs(q);
        const docs = querySnapshoot.docs;

        let total = 0;

        const group = docs.reduce((obj, item) => {
            const itemData = item.data();
            total += Number(itemData.total)
            if (!obj[itemData.bulan]) {
                obj[itemData.bulan] = Number(itemData.total).toLocaleString('id-ID', {minimumFractionDigits: 0});
            }
            return obj;
        }, {});
        setYearlyTotal(total);
        setData(group);
    }

    useEffect(() => {
        getRecap();
    }, []);

    return ( 
        <div className="fitwidth">
            <div className="summary-box">
                <div className="box box-12 yearly">
                    <FontAwesomeIcon icon={faCalendar} />
                    <div>
                        <label>Tahun Ini</label>
                        <p>Rp. {Number(yearlyTota).toLocaleString('id-ID', {minimumFractionDigits: 0})}</p>
                    </div>
                </div>
            </div>
            <h4>Pengeluaran tiap bulan di tahun {new Date().getFullYear()}</h4>
            <div className="year-summary-container">
                {
                    months.map((item) => {
                        const monthItem = new Date(2020, item, 1).toLocaleDateString('id-ID', {month: 'long'});
                        return <YearSummary key={item} data={data} month={monthItem} />
                    })
                }
            </div>
        </div>
     );
}
 
export default Summary;