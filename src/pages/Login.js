import { useState } from "react";
import { useHistory } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
    const browserHistory = useHistory();
    const authentication = getAuth();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const doSignIn = (e) => {
        e.preventDefault();
        if (email && password) {
            setLoading(true);
            signInWithEmailAndPassword(authentication, email, password)
                .then(() => {
                    browserHistory.push('/')
                })
                .catch(err => {
                    console.log(err);
                })
                .finally(() => {
                    setLoading(false);
                })
        }
    }
    return ( 
        <div className="fitwidth">
            <div className="login">
                <img src="images/zaida.png" alt="zaida finance img" />
                <h1>Zaida Finance</h1>
                <form className="form" onSubmit={doSignIn}>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email..." />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="sandi..."/>
                    <button disabled={loading} className="btn-primary">
                        {loading ? 'Loading' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
     );
}
 
export default Login;