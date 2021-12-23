import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import firebaseDB from '_firebaseconn/firebase.config';
import SurveyList from 'components/SurveyList';

const Survey = () => {
    const surveyDB = firebaseDB.firestore().collection('survey');

    const [data, setData] = useState([]);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [priceTemp, setPriceTemp] = useState('');
    const [seller, setSeller] = useState('');

    const getSurveyList = () => {
        surveyDB
            .onSnapshot(response => {
                const data = [];
                response.forEach(element => {
                    const item = element.data();
                    item.price_label = parseFloat(item.price).toLocaleString('id-ID', {minimumFractionDigits: 0});
                    data.push(item);
                });
                setData(data);
            })
    }

    const handlePriceChange = (e) => {
        const value = e.target.value;
        setPriceTemp(value);
    }

    const submit = () => {
        const payload = {
            id: uuidv4(),
            name,
            price: price.replaceAll('.', ''),
            seller
        };
        surveyDB
            .doc(payload.id)
            .set(payload);
        reset();
    }

    const reset = () => {
        setName('');
        setPrice('');
        setSeller('');
        setPriceTemp('');
    }

    useEffect(() => {
        const replcaeDot = priceTemp.replaceAll('.', '');
        const reg = new RegExp('^[0-9]+$');
        if (reg.test(replcaeDot)) {
            const nominal = Number(replcaeDot).toLocaleString('id-ID', {maximumFractionDigits: 0});
            setPrice(nominal);
        }
    }, [priceTemp]);

    const handleDelete = (id) => {
        surveyDB
            .doc(id)
            .delete()
    }

    useState(() => {
        getSurveyList();
    }, []);

    return ( 
        <div className="fitwidth">
            <h4>Masukkan toko rekomendasi</h4>
            <div className="form">
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="nama barang..." />
                <input type="text" value={seller} onChange={(e) => setSeller(e.target.value)} placeholder="penjual..."/>
                <input type="text" value={price} onChange={handlePriceChange} placeholder="harga..."/>
                <div className="btn-group">
                    <button className='btn-danger' onClick={reset}>Reset</button>
                    <button className='btn-primary' onClick={submit} >Simpan</button>
                </div>
            </div>
            <h4>Rekomendasi toko dan harga</h4>
            <div className='survey-list-container'>
                <SurveyList data={data} onDelete={handleDelete} />
            </div>
        </div>
     );
}
 
export default Survey;