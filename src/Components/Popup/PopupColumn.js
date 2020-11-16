import React, { Fragment, useContext, useState } from 'react';
import TextareaAutosize from 'react-autosize-textarea/lib';
import StoreApi from '../../Utils/StoreApi';
import checklists from '../../Image/checklists.png';
import memo from '../../Image/memo.png';
import trash from '../../Image/delete.png';

const styles = {
   container: {
      margin: '10px 10px 20px 45px',
      position: 'relative'
   },
   textarea: {
      fontSize: '20px',
      width: '100%',
      border: 'none',
      boxShadow: '1px 4px 5px rgba(9,30,66,.25)',
      padding: '5px'
   },
   p: {
      marginBottom: '5px',
      fontSize: 18
   },
   date: {
      border: 'none',
      boxShadow: '1px 4px 5px rgba(9,30,66,.25)',
      padding: '5px'
   },
   image: {
      position: 'absolute',
      top: '2px',
      left: '-35px',
   },
   button: {
      display: 'flex',
      border: 'none',
      padding: '5px',
      borderRadius: '50%',
      background: '#ff4d4d'
   }
}

const PopupColumn = ({column, index, setInputTitle}) => {

   const {updateColumn, deleteColumn} = useContext(StoreApi)

   const [titleValue, setTitleValue] = useState(column.title)
   const titleHandler = (e) => {
      setTitleValue(e.target.value)
   } 

   const [descr, setDescr] = useState(column.description)
   const descrHandler = (e) => {
      setDescr(e.target.value)
   }

   const updateOnBlur = () => {
      updateColumn(titleValue, column.id, 'title')
      setInputTitle(titleValue)
   }

   return (
      <Fragment>
         <div style={styles.container}>
            <TextareaAutosize 
               value={titleValue}
               onChange={titleHandler}
               maxRows={4}
               style={styles.textarea}
               spellCheck='false'
               onBlur={() => updateOnBlur()}
            />
            <div style={styles.image}>
               <img  src={checklists} alt="popup_checklists"/>
            </div>
         </div>

         <div style={styles.container}>
            <p style={styles.p}>Description :</p>
            <TextareaAutosize 
               style={styles.textarea}
               maxRows={4}
               spellCheck='false'
               value={descr}
               onChange={descrHandler}
               onBlur={() => updateColumn(descr, column.id, 'description')}

            />
            
            <div style={styles.image}>
               <img src={memo} alt="popup_memo"/>
            </div>
         </div>
         

         <div style={styles.container}>
            <button
               onClick={() => deleteColumn(column.id, index)}
               style={styles.button}
            >
               <img src={trash} alt="delete_icon" style={styles.img}/>
            </button>
         </div>
      </Fragment>
   );
}

export default PopupColumn;