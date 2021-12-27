import { useState, useEffect, createContext } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export const AuthContext = createContext({ user: null });
const  AuthProvider = (props) => {
  let unsubscribe;
  const authentication = getAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    unsubscribe = onAuthStateChanged(authentication, (user) => {
      // console.log(user.email);
      if (user) {
        const {uid, email} = user;
        setUser({uid, email});
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [authentication]);

  return ( 
    <AuthContext.Provider value={user}>
      {loading === false ? <div>
        {props.children}
      </div>
      :
      <div className="loader-container">Loading..</div>
      }
    </AuthContext.Provider>
   );
}
 
export default AuthProvider;