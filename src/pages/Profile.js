import { useContext } from 'react';
import { getAuth, signOut } from "firebase/auth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '_provider/AuthProvider';
import Admin from './Admin';

const Profile = () => {
    const currentUser = useContext(AuthContext);

    const doLogout = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            // Sign-out successful.
          }).catch((error) => {
            // An error happened.
          });
    }

    return ( 
        <div className="fitwidth">
            <div className="profile-header">
                <h4>Profile</h4>
                <button className="btn-danger btn-sm" onClick={doLogout}>
                    <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                </button>
            </div>
            <div className="profile-body">
                <label>Nama</label>
                <p>{currentUser.displayName}</p>
                <label>Email</label>
                <p>{currentUser.email}</p>
                <label>Nomor</label>
                <p>{currentUser.phone || '-'}</p>
            </div>
            {currentUser.uid === '84H94XYQ69fOumcCFmTxQXTVayz1' && <Admin /> }
        </div>
     );
}
 
export default Profile;