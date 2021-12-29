import React, { useEffect, useState, useContext } from "react";
import { getAuth, signOut } from "firebase/auth";
import { setDoc, doc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { firebaseDB } from '_firebaseconn/firebase.config';
import { AuthContext } from '_provider/AuthProvider';
import { RecapContext } from '_provider/RecapProvider';

const ShoppingForm = ({title}) => {
    const currentUser = useContext(AuthContext);
    const recap = useContext(RecapContext);

    let focusInput = null;
    const [name, setName] = useState('');
    const [priceTemp, setPriceTemp] = useState(null);
    const [price, setPrice] = useState('');

    const handlePriceChange = (e) => {
        const value = e.target.value;
        setPriceTemp(value);
    }
    
    const submit = (e) => {
        e.preventDefault();
        if (name && price) {
            addShoppingList();
            updateRecap();
            reset();
        }
    }

    const addShoppingList = () => {
        const date = new Date();
        const payload = {
            id: uuidv4(),
            name,
            price: price.replaceAll('.', ''),
            time: date.getTime(),
            userId: currentUser.uid,
            createdAt: date.toISOString().split('T')[0]
        };
        const ref = doc(firebaseDB, 'pengeluaran', payload.id);
        setDoc(ref, payload);
    }

    const updateRecap = () => {
        const recapPayload = recap;
        const total = Number(recapPayload.total) + Number(price.replaceAll('.', ''));
        recapPayload.total = total.toString();

        const ref = doc(firebaseDB, 'rekap', recapPayload.id);
        setDoc(ref, recapPayload);
    }

    const reset = () => {
        setName('');
        setPrice('');
        setPriceTemp(null);
        focusInput.focus();
    }

    const doLogout = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            // Sign-out successful.
          }).catch((error) => {
            // An error happened.
          });
    }

    useEffect(() => {
        if (priceTemp) {
            const replcaeDot = priceTemp.replaceAll('.', '');
            const reg = new RegExp('^[0-9]+$');
            if (reg.test(replcaeDot)) {
                const nominal = Number(replcaeDot).toLocaleString('id-ID', {maximumFractionDigits: 0});
                setPrice(nominal);
            }
        }
    }, [priceTemp]);

    useEffect(() => {
        focusInput.focus();
    }, []);

    return (
        <React.Fragment>
            <h4>{title}</h4>
            <form className="form" onSubmit={submit}>
                <input ref={(input) => focusInput = input} type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="nama barang..." />
                <input type="text" value={price} onChange={handlePriceChange} placeholder="harga..."/>
                <div className="btn-group">
                    <button type="button" className="btn-danger" onClick={reset}>Reset</button>
                    <button className="btn-primary" >Simpan</button>
                </div>
            </form>
        </React.Fragment>
     );
}
 
export default ShoppingForm;