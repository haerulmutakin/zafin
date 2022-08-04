import { useState, useEffect, useContext } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { AuthContext } from '_provider/AuthProvider';
import { firebaseDB } from '_firebaseconn/firebase.config';
import YearSummary from "../components/YearSummary";

const Summary = () => {
    const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    const currentUser = useContext(AuthContext);
    const recapDB = collection(firebaseDB, 'rekap');

    const [data, setData] = useState({});

    const getRecap = async () => {
        const q = query(recapDB, where('tahun', '==', new Date().toLocaleDateString('id-ID', {year: 'numeric'})), where('userId', '==', currentUser.uid));

        const querySnapshoot = await getDocs(q);
        const docs = querySnapshoot.docs;

        const group = docs.reduce((obj, item) => {
            const itemData = item.data();
            if (!obj[itemData.bulan]) {
                obj[itemData.bulan] = Number(itemData.total).toLocaleString('id-ID', {minimumFractionDigits: 0});
            }
            return obj;
        }, {});
        setData(group);
    }

    useEffect(() => {
        getRecap();
    }, []);

    return ( 
        <div className="fitwidth">
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