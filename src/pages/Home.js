import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import firebaseDB from '_firebaseconn/firebase.config';
import ShoppingList from "../components/ShoppingList";

const Home = () => {
    const projectsDB = firebaseDB.firestore().collection('pengeluaran');
    let focusInput = null;
    const [data, setData ] = useState([]);
    const [name, setName] = useState('');
    const [priceTemp, setPriceTemp] = useState('');
    const [price, setPrice] = useState('');
    const [dailyTotal, setDailyTotal] = useState(0);
    const [monthlyTotal, setMonthlyTotal] = useState(0);

    const getMonthlyReport = () => {
        const date = new Date();
        projectsDB
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
        projectsDB
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

    const submit = () => {
        const date = new Date();
        const payload = {
            id: uuidv4(),
            name,
            price: price.replaceAll('.', ''),
            time: date.getTime(),
            createdAt: date.toISOString().split('T')[0]
        };
        projectsDB
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

    const handleDelete = (id) => {
        projectsDB
            .doc(id)
            .delete()
    }

    const handlePriceChange = (e) => {
        const value = e.target.value;
        setPriceTemp(value);
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
        getShoppingList();
        getMonthlyReport();
    }, []);

    return ( 
        <div className="home">
            <div className="summary-box">
                <div className="box daily">
                    <label>Pengeluaran Hari Ini</label>
                    <p>{dailyTotal}</p>
                </div>
                <div className="box monthly">
                    <label>Pengeluaran Bulan Ini</label>
                    <p>{monthlyTotal}</p>
                </div>
            </div>
            <h4>Yuk, catat pengeluaran hari ini!</h4>
            <div className="form">
                <input ref={(input) => focusInput = input} type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="nama barang..." />
                <input type="text" value={price} onChange={handlePriceChange} placeholder="harga..."/>
                <div className="btn-group">
                    <button onClick={reset}>Reset</button>
                    <button onClick={submit} >Simpan</button>
                </div>
            </div>
            <ShoppingList data={data} onDelete={handleDelete} />
        </div>
     );
}
 
export default Home;