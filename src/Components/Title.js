import React, { useContext, useState } from 'react';
import StoreApi from '../Utils/StoreApi';
import PopupColumn from './Popup/PopupColumn';
import PopupContainer from './Popup/PopupContainer';
import menu from '../Image/menu.png';

const styles = {
   titleContainer: {
      display: 'flex',
      padding: '5px 5px'
   },
   editableTitle: {
      position: 'relative',
      flexGrow: 1,
      overflow: 'hidden',
      margin: '0 5px 0  0'
   },
   titleValue: {
      fontSize: '22px',
      cursor: 'pointer'
   },
   input: {
      position: 'absolute',
      top: 0,
      left: 0,
      fontSize: '22px',
      width: '100%',
      border: 'none',
      background: '#f5fcfc',
      borderRadius: '3px'
   },
   nav: {
      cursor: 'pointer'
   }
}


const Title = ({column, index}) => {

   const [titleValue, setTitleValue] = useState(column.title)

   const [open, setOpen] = useState(false)

   const {updateColumn} = useContext(StoreApi)

   const titleHanlder = (e) => {
      setTitleValue(e.target.value)
   }

   const focusOnClick = (id) => {
      setOpen(true)
      document.getElementById(id).focus()
   }

   const updateOnBlur = () => {
      setOpen(false)
      updateColumn(titleValue, column.id, 'title')
   }

   //Popup Column
   const [popupOpen, setPopupOpen] = useState(false)

   return (
      <div style={styles.titleContainer}>
         <div style={styles.editableTitle}>
            <div
               onClick={() => focusOnClick(column.id)}
               style={{
                  opacity: open ? 0 : 1,
                  ...styles.titleValue
               }}
            >
               {column.title ? column.title : 'New Column'}
            </div>
            
            <input
               id={column.id} 
               value={titleValue} 
               onChange={(e) => titleHanlder(e)}
               onBlur={() => updateOnBlur()}
               style={{
                  zIndex: open ? 2 : -1,
                  ...styles.input
               }}
               type="text" 
               spellCheck='false'
               autoComplete='off'
            />
         </div>
         <div 
            onClick={() => setPopupOpen(true)}
            style={styles.nav}
         >
            <img src={menu} alt="menu_icon"/> 
         </div>
         <PopupContainer open={popupOpen} onClose={() => setPopupOpen(false)}>
            <PopupColumn column={column} index={index} setInputTitle={setTitleValue}/>
         </PopupContainer>
      </div>
   );
}

export default Title;