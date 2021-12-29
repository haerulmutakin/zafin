import { useState, useEffect, useContext } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { AuthContext } from '_provider/AuthProvider';
import { firebaseDB } from '_firebaseconn/firebase.config';

const YearSummary = () => {
    const months = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11);
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
        <div className="year-summary-container">
            {
                months.map((item) => {
                    const monthItem = new Date(2020, item, 1).toLocaleDateString('id-ID', {month: 'long'});
                    return <div key={item} className="summary-month-item box-4">
                        <p>{monthItem}</p>
                        <label>{data[monthItem] || '-'}</label>
                    </div>
                })
            }
        </div>
     );
}
 
export default YearSummary;