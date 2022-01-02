import { useState, useEffect, useContext } from 'react';
import { collection, orderBy, where, query, getDocs, setDoc, doc, deleteDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { firebaseDB } from '_firebaseconn/firebase.config';
import { AuthContext } from '_provider/AuthProvider';
import SurveyList from 'components/SurveyList';

const Survey = () => {
    const surveyDB = collection(firebaseDB, 'survey');
    const currentUser = useContext(AuthContext);
    const [data, setData] = useState([]);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [priceTemp, setPriceTemp] = useState('');
    const [seller, setSeller] = useState('');

    const getSurveyList = async () => {
        const q = query(surveyDB, orderBy('time', 'desc'), where('userId', '==', currentUser.uid));
        const querySnapshoot = await getDocs(q);
        const docs = querySnapshoot.docs;
        const data = [];
        docs.forEach(element => {
            const item = element.data();
            item.price_label = parseFloat(item.price).toLocaleString('id-ID', {minimumFractionDigits: 0});
            data.push(item);
        });
        setData(data);
    }

    const handlePriceChange = (e) => {
        const value = e.target.value;
        setPriceTemp(value);
    }

    const submit = (e) => {
        e.preventDefault();
        if (name && price && seller) {
            const payload = {
                id: uuidv4(),
                name,
                price: price.replaceAll('.', ''),
                seller,
                time: new Date().getTime(),
                userId: currentUser.uid
            };
            const ref = doc(firebaseDB, 'survey', payload.id);
            setDoc(ref, payload);
            getSurveyList();
            reset();
        }
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
        deleteDoc(doc(firebaseDB, 'survey', id));
        getSurveyList();
    }

    useState(() => {
        getSurveyList();
    }, []);

    return ( 
        <div className="fitwidth">
            <h4>Masukkan toko rekomendasi</h4>
            <form className="form" onSubmit={submit}>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="nama barang..." />
                <input type="text" value={seller} onChange={(e) => setSeller(e.target.value)} placeholder="penjual..."/>
                <input type="text" value={price} onChange={handlePriceChange} placeholder="harga..."/>
                <div className="btn-group">
                    <button type="button" className='btn-danger' onClick={reset}>Reset</button>
                    <button className='btn-primary'>Simpan</button>
                </div>
            </form>
            <h4>Rekomendasi toko dan harga</h4>
            <div className='survey-list-container'>
                <SurveyList data={data} onDelete={handleDelete} />
            </div>
        </div>
     );
}
 
export default Survey;