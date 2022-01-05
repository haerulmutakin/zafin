import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrash} from '@fortawesome/free-solid-svg-icons';

const UserList = ({users, onEdit, onDelete}) => {
    return ( 
        <div className="sl-items">
            {users.map((item) => (
                <div key={item.uid} className="sl-item">
                    <div className="item-info">
                        <p>{item.displayName || '-'}</p>
                        <p>{item.email}</p>
                    </div>
                    <div className="user-actions">
                        <FontAwesomeIcon icon={faPencilAlt}  onClick={() => onEdit(item)} />
                        <FontAwesomeIcon icon={faTrash} onClick={() => onDelete(item)} />
                    </div>
                </div>
            ))}
        </div>
     );
}
 
export default UserList;