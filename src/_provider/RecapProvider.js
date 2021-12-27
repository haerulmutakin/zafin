import { createContext, useState, useEffect, useContext } from 'react';
import { collection, onSnapshot, query, where, doc, setDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { AuthContext } from '_provider/AuthProvider';
import { firebaseDB } from '_firebaseconn/firebase.config';

export const RecapContext = createContext({ recap: null });
const RecapProvider = (props) => {
    let unsubscribe;
    const currentUser = useContext(AuthContext);
    const recapDB = collection(firebaseDB, 'rekap');

    const [data, setData] = useState(null);

    const createRecap = (periode) => {
        const payload = {
            id: uuidv4(),
            periode,
            total: '0',
            userId: currentUser.uid
        }

        const ref = doc(firebaseDB, 'rekap', payload.id);
        setDoc(ref, payload);
    }

    useEffect(() => {
        const date = new Date().toISOString().substring(0, 7);
        const q = query(recapDB, where('periode', '==', '2021-12'), where('userId', '==', currentUser.uid))
        unsubscribe = onSnapshot(q, (doc) => {
            if(doc.empty) {
                createRecap(date);
            } else {
                const data = doc.docs[0].data();
                setData(data);
            }
        });

        return () => unsubscribe();
    }, []);

    return ( 
        <RecapContext.Provider value={data}>
            {props.children}
        </RecapContext.Provider>
     );
}
 
export default RecapProvider;