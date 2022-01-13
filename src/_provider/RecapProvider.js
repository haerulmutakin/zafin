import { createContext, useState, useEffect, useContext } from 'react';
import { collection, query, where, doc, setDoc, writeBatch, getDocs } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { AuthContext } from '_provider/AuthProvider';
import { firebaseDB } from '_firebaseconn/firebase.config';

export const RecapContext = createContext({ recap: null });
const RecapProvider = (props) => {
    const batch = writeBatch(firebaseDB);
    const currentUser = useContext(AuthContext);
    const recapDB = collection(firebaseDB, 'rekap');
    const outcomeDB = collection(firebaseDB, 'pengeluaran');

    const [data, setData] = useState(null);

    const deleteLastMonthOutcomeData = async() => {
        const date = new Date();
        const firstDateOfLastMonth = new Date(date.getFullYear(), date.getMonth() - 1, 1);
        const lastDateOfLastMonth = new Date(new Date(date.getFullYear(), date.getMonth(), 0));

        const q = query(
            outcomeDB,
            where('time', '>=', firstDateOfLastMonth.getTime()),
            where('time', '<=', lastDateOfLastMonth.getTime()),
            where('userId', '==', currentUser.uid)
        );

        const querySnapshoot = await getDocs(q);
        if (!querySnapshoot.empty) {
                querySnapshoot.docs.forEach(item => {
                    batch.delete(item.ref);
                });
                batch.commit();
        }
    }

    const getRecap = async () => {
        const date = new Date();
        const currentYear = date.toLocaleDateString('id-ID', {year: 'numeric'});
        const currentMonth = date.toLocaleDateString('id-ID', {month: 'long'});

        const q = query(recapDB, where('tahun', '==', currentYear), where('bulan', '==', currentMonth), where('userId', '==', currentUser.uid));

        const querySnapshoot = await getDocs(q);
        if (querySnapshoot.empty) {
            createRecap(currentYear, currentMonth);
        } else {
            const data = querySnapshoot.docs[0].data();
            setData(data);
        }
    }

    const createRecap = (year, month) => {
        const payload = {
            id: uuidv4(),
            tahun: year,
            bulan: month,
            total: '0',
            userEmail: currentUser.email,
            userId: currentUser.uid
        }

        const ref = doc(firebaseDB, 'rekap', payload.id);
        setDoc(ref, payload);
    }

    useEffect(() => {
        deleteLastMonthOutcomeData();
    }, []);

    useEffect(() => {
        getRecap();
    }, []);

    return ( 
        <RecapContext.Provider value={data}>
            {props.children}
        </RecapContext.Provider>
     );
}
 
export default RecapProvider;