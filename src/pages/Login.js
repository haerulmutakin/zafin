import { useState } from "react";
import { useHistory } from 'react-router-dom';
import { Auth } from '_firebaseconn/firebase.config';

const Login = () => {
    const browserHistory = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const doSignIn = () => {
        Auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                browserHistory.push('/')
            })
            .catch(err => {
                console.log(err);
            })
    }
    return ( 
        <div className="fitwidth">
            <div className="login">
                <img src="images/zaida.png" />
                <h1>Zaida Finance</h1>
                <div className="form">
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email..." />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="sandi..."/>
                    <button onClick={doSignIn} >Login</button>
                </div>
            </div>
        </div>
     );
}
 
export default Login;