import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPencilAlt, faTrash} from '@fortawesome/free-solid-svg-icons';

const UserList = ({users, onDelete}) => {
    return ( 
        <div className="sl-items">
            {users.map((item) => (
                <div key={item.uid} className="sl-item">
                    <div className="item-info">
                        <p>{item.displayName || '-'}</p>
                        <p>{item.email}</p>
                    </div>
                    <div className="user-actions">
                        <FontAwesomeIcon icon={faEye} />
                        <FontAwesomeIcon icon={faPencilAlt} />
                        <FontAwesomeIcon icon={faTrash} onClick={() => onDelete(item)} />
                    </div>
                </div>
            ))}
        </div>
     );
}
 
export default UserList;