import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Api from '_api/admin-api';
import UserList from 'components/UserList';

const Admin = () => {
    const [users, setUsers] = useState([]);

    const handleDelete = (id) => {
        console.log(id);
    }

    useEffect(() => {
        Api.get('/user')
            .then(res => {
                setUsers(res.data);
            })
    }, [])
    return ( 
        <div className="fitwidth">
            <div className="user-list-title">
                <h4>Daftar User</h4>
                <div className="add-new-user">
                    <FontAwesomeIcon icon={faPlus} />
                    &nbsp;<span>Add New</span>
                </div>
            </div>
            <UserList users={users} onDelete={handleDelete} />
        </div>
     );
}
 
export default Admin;