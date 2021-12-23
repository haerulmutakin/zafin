import { createContext, useState, useEffect, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { AuthContext } from '_provider/AuthProvider';
import firebaseDB from '_firebaseconn/firebase.config';

export const RecapContext = createContext({ recap: null });
const RecapProvider = (props) => {
    const currentUser = useContext(AuthContext);
    const recapDB = firebaseDB.firestore().collection('rekap');

    const [data, setData] = useState(null);

    const createRecap = (periode) => {
        const payload = {
            id: uuidv4(),
            periode,
            total: '0',
            userId: currentUser.uid
        }

        recapDB
            .doc(payload.id)
            .set(payload)
    }

    useEffect(() => {
        let mounted = true;
        const date = new Date().toISOString().substring(0, 7);
        recapDB
            .where('userId', '==', currentUser.uid)
            .where('periode', '==', date)
            .onSnapshot(response => {
                if (response.empty) {
                    createRecap(date);
                } else {
                    const data = response.docs[0].data();
                    if (mounted) {
                        setData(data);
                    }
                }
            });
        return () => {
            mounted = false;
        }
    }, []);

    return ( 
        <RecapContext.Provider value={data}>
            {props.children}
        </RecapContext.Provider>
     );
}
 
export default RecapProvider;