import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faExclamationCircle, faInfoCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const ConfirmModal = ({
    type = 'warning',
    title = 'Confirmation',
    subtitle,
    cancleButton = true,
    confirmButton = true,
    cancleLabel = 'Cancel',
    confirmLabel = 'Yes',
    onClose
}) => {

    const handleCloseOnEscape = (e) => {
        if (e.charCode || e.keyCode === 27) {
            onClose(false);
        }

        if (e.keyCode === 13) {
            onClose(true);
        }
    }

    const RenderIcon = () => {
        let icon;
        switch (type) {
            case 'info':
                icon = faInfoCircle;
                break;
            case 'danger':
                icon = faTimesCircle;
                break;
            case 'success':
                icon = faCheck;
                break;
            default:
                icon = faExclamationCircle;
                break;
        }

        return <FontAwesomeIcon icon={icon} />
    }

    useEffect(() =>{
        document.body.addEventListener('keydown', handleCloseOnEscape);
        return () => {
            document.body.removeEventListener('keydown', handleCloseOnEscape);
        }
    }, []);

    return ReactDOM.createPortal( 
        <div onClick={() => onClose(false)} className="modal">
            <div onClick={(e) => e.stopPropagation()} className="modal-content">
                <div className="confirm-content">
                    <RenderIcon />
                    <h2>{title}</h2>
                    <p>{subtitle}</p>
                    <div className="confirm-btn-group">
                        {cancleButton && (
                            <button onClick={() => onClose(false)} className="btn-primary">{cancleLabel}</button>
                        )}
                        {confirmButton && (
                            <button onClick={() => onClose(true)} className="btn-danger">{confirmLabel}</button>
                        )}
                    </div>
                </div>
            </div>
        </div>,
        document.getElementById('root')
     );
}
 
export default ConfirmModal;