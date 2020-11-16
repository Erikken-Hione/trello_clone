import React, { Fragment } from 'react';
import ReactDom from 'react-dom';

const styles = {
 popupContent: {
    position: 'fixed',
    backgroundColor: '#F5FFFA',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '35%',
    height: '65%',
    zIndex: 1001,
    overflowX: 'hidden',
    overflowY: 'auto',
    cursor: 'default'
 },
 popupOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 1000
 },
}

const PopupContainer = ({open, onClose, children}) => {

   if (!open) return null

   return ReactDom.createPortal(
      <Fragment>
         <div 
            style={styles.popupOverlay} 
            onClick={onClose}
         />
         <div style={styles.popupContent}>
            {children}
         </div>
      </Fragment>,
      document.getElementById('portal')
   );
}

export default PopupContainer;