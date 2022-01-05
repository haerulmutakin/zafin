import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Api from '_api/admin-api';
import UserList from 'components/UserList';
import ConfirmModal from 'widgets/ConfirmModal';

const Admin = () => {
    const [users, setUsers] = useState([]);
    const [show, setShow] = useState(false);
    const [deleteUserId, setDeleteUserId] = useState(null);

    const handleDelete = (data) => {
        setDeleteUserId(data.uid);
        setShow(true);
    }

    const handleModalClose = (confirm) => {
        if (confirm) {
            doDelete();
            return;
        }
        setShow(false);
    }
    
    const doDelete = () => {
        Api.delete('/user/' + deleteUserId)
            .then(() => {
                getUsers();

            })
            .finally(() => {
                setDeleteUserId(null);
                setShow(false);
            })

    }

    const getUsers = () => {
        Api.get('/user')
            .then(res => {
                setUsers(res.data);
            })
    }

    useEffect(() => {
        getUsers();
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
            {show && (
                <ConfirmModal
                    type="danger"
                    title="Are you sure want to delete this user?"
                    subtitle="This action cannot be undo"
                    onClose={handleModalClose}
                />
            )}
            <UserList users={users} onDelete={handleDelete} />
        </div>
     );
}
 
export default Admin;