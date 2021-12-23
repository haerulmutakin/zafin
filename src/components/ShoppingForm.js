import React, { useEffect, useState, useContext } from "react";
import { v4 as uuidv4 } from 'uuid';
import { Auth } from "_firebaseconn/firebase.config";
import firebaseDB from '_firebaseconn/firebase.config';
import { AuthContext } from '_provider/AuthProvider';

const ShoppingForm = ({title}) => {
    const outcomeDB = firebaseDB.firestore().collection('pengeluaran');
    const currentUser = useContext(AuthContext);

    let focusInput = null;
    const [name, setName] = useState('');
    const [priceTemp, setPriceTemp] = useState('');
    const [price, setPrice] = useState('');

    const handlePriceChange = (e) => {
        const value = e.target.value;
        setPriceTemp(value);
    }
    
    const submit = () => {
        const date = new Date();
        const payload = {
            id: uuidv4(),
            name,
            price: price.replaceAll('.', ''),
            time: date.getTime(),
            userId: currentUser.uid,
            createdAt: date.toISOString().split('T')[0]
        };
        outcomeDB
            .doc(payload.id)
            .set(payload);
        reset();
    }

    const reset = () => {
        setName('');
        setPrice('');
        setPriceTemp('');
        focusInput.focus();
    }

    const doLogout = () => {
        Auth.signOut()
            .catch(err => console.warn(err))
    }

    useEffect(() => {
        const replcaeDot = priceTemp.replaceAll('.', '');
        const reg = new RegExp('^[0-9]+$');
        if (reg.test(replcaeDot)) {
            const nominal = Number(replcaeDot).toLocaleString('id-ID', {maximumFractionDigits: 0});
            setPrice(nominal);
        }
    }, [priceTemp]);

    useEffect(() => {
        focusInput.focus();
    }, []);

    return (
        <React.Fragment>
            <h4>{title}</h4>
            <div className="form">
                <input ref={(input) => focusInput = input} type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="nama barang..." />
                <input type="text" value={price} onChange={handlePriceChange} placeholder="harga..."/>
                <div className="btn-group">
                    <button onClick={doLogout}>Reset</button>
                    <button onClick={submit} >Simpan</button>
                </div>
            </div>
        </React.Fragment>
     );
}
 
export default ShoppingForm;