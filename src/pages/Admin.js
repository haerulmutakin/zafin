import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Api from '_api/admin-api';
import UserList from 'components/UserList';
import ConfirmModal from 'widgets/ConfirmModal';
import { DialodModal, ModalBody, ModalFooter, ModalHeader} from 'widgets/DialogModal';

const Admin = () => {
    const [users, setUsers] = useState([]);
    const [show, setShow] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [deleteUserId, setDeleteUserId] = useState(null);
    const [editUserId, setEditUserId] = useState(null);
    const [formMode, setFormMode] = useState('add');

    const [userForm, setUserForm] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        displayName: ''
    });

    const handleFormChange = (e) => {
        setUserForm({
            ...userForm,
            [e.target.name]: e.target.value
        })
    }

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

    const handleAddModalClose = () => {
        setShowAddModal(false);
        setUserForm({});
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

    const handleSubmit = (e) => {
        e.preventDefault();
        const {email, password, displayName} = userForm;
        if (formMode === 'add') {
            doCreateUser({email, password, displayName});
        } else {
            doUpdateUser({password, displayName});
        }
    }

    const doCreateUser = (payload) => {
        Api.post('/user', payload)
            .then(res => {
                setUserForm({});
                setShowAddModal(false);
                getUsers();
            })
    }

    const doUpdateUser = (payload) => {
        Api.put('/user/' + editUserId , payload)
            .then(res => {
                setUserForm({});
                setShowAddModal(false);
                getUsers();
            })
            .finally(() => {
                setEditUserId(null);
            })
    }

    const getUsers = () => {
        Api.get('/user')
            .then(res => {
                setUsers(res.data);
            })
    }

    const handleEdit = (data) => {
        const {uid, email, displayName} = data;
        setFormMode('edit');
        setEditUserId(uid);
        setUserForm({
            ...userForm,
            email,
            displayName
        });
        setShowAddModal(true)
    }

    const handleShowAddModal = () => {
        setFormMode('add');
        setShowAddModal(true);
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
                    &nbsp;<span onClick={handleShowAddModal} >Tambah</span>
                </div>
            </div>
            <UserList users={users} onDelete={handleDelete} onEdit={handleEdit} />
            {show && (
                <ConfirmModal
                    type="danger"
                    title="Are you sure want to delete this user?"
                    subtitle="This action cannot be undo"
                    onClose={handleModalClose}
                />
            )}
            {showAddModal && (
                <DialodModal onClose={handleAddModalClose}>
                    <ModalHeader>
                        <p className="modal-title">Tambah Pengguna</p>
                    </ModalHeader>
                    <form className="form" onSubmit={handleSubmit}>
                        <ModalBody>
                                <input type="email" name="email" placeholder="Email" value={userForm.email} onChange={handleFormChange} disabled={formMode !== 'add'} />
                                <input type="text" name="displayName" placeholder="Nama" value={userForm.displayName} onChange={handleFormChange} />
                                <input type="password" name="password" placeholder="Kata sandi" value={userForm.password} onChange={handleFormChange} />
                                <input type="password" name="confirmPassword" placeholder="Konfirmasi kata sandi" value={userForm.confirmPassword} onChange={handleFormChange} />
                        </ModalBody>
                        <ModalFooter>
                            <div className="btn-group">
                                <button type="button" className="btn-danger">Batal</button>
                                <button className="btn-primary">Simpan</button>
                            </div>
                        </ModalFooter>
                    </form>
                </DialodModal>
            )}
        </div>
     );
}
 
export default Admin;