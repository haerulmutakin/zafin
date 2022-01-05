import { useEffect } from 'react';
import reactDom from "react-dom";

export const DialodModal = ({onClose, children}) => {

    const handleCloseOnEscape = (e) => {
        if (e.charCode || e.keyCode === 27) {
            onClose(false);
        }
    }

    useEffect(() =>{
        document.body.addEventListener('keydown', handleCloseOnEscape);
        return () => {
            document.body.removeEventListener('keydown', handleCloseOnEscape);
        }
    }, []);
    return (
        reactDom.createPortal(
            <div className="modal" onClick={() => onClose(false)}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    {children}
                </div>
            </div>,
            document.getElementById('root')
        )
     );
}

export const ModalHeader = ({children}) => {
    return ( 
        <div className="modal-header">
            {children}
        </div>
     );
}

export const ModalBody = ({children}) => {
    return ( 
        <div className="modal-body">
            {children}
        </div>
     );
}

export const ModalFooter = ({children}) => {
    return ( 
        <div className="modal-footer">
            {children}
        </div>
     );
}