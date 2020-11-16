import React, { useContext, useState } from 'react';
import TextareaAutosize from 'react-autosize-textarea/lib';
import StoreApi from '../../Utils/StoreApi';
import cancel from '../../Image/cancel.png';

const styles = {
   container: {
      background: '#DEF2F1',
   },
   textarea: {
      width: '100%',
      padding: '5px',
      border: 'none',
      borderRadius: '3px',
      minHeight: '50px',
      boxShadow: '1px 2px 3px rgba(9,30,66,.25)'
   },
   submitContainer: {
      display: 'flex',
   },
   button: {
      padding: '0px 25px',
      borderRadius: '3px',
      outline: 'none',
      background: '#5aac44',
      border: 'none',
      color: '#fff',
      height: ''
   },
   imageContainer: {
      display: 'flex',
      flex: '0 1 25px',
      marginLeft: '5px',
      cursor: 'pointer'
   },
   image: {
      width: '100%',
      padding: '5px'
   }
}  

const InputElement = ({setOpen, type, columnId}) => {

   const [newTitle, setNewTitle] = useState('')

   const {addMoreCard, addMoreColumn} = useContext(StoreApi)

   const newTitleHandler = (e) => {
      setNewTitle(e.target.value)
   }

   const submitElement = () => {
      if (type==='card' && newTitle) {
         addMoreCard(newTitle, columnId)
         setOpen(false)
      } else if (type==='column' && newTitle) {
         addMoreColumn(newTitle)
         setOpen(false)
      }
   }

   const onBlurSubmit = () => {
      if (newTitle) {
         submitElement()
      } else {
         setOpen(false)
      }
   }
   
   return (
      <div 
         style={{
            padding: type==='column' ? '5px' : null,
            boxShadow: type==='column' ? '1px 4px 5px rgba(9,30,66,.25)' : null,
            ...styles.container}}
      >
         <TextareaAutosize 
            maxRows = {5}
            onChange = {newTitleHandler}
            placeholder = {type==='card' ? 'Enter a card title' : 'Enter a column title'}
            style={styles.textarea}
            spellCheck='false'
            onBlur={() => onBlurSubmit()}
         />
         <div style={styles.submitContainer}> 

            <button
               onClick={() => submitElement()}
               style={styles.button}
            >
             ADD CARD
            </button>

            <div
               onClick={(e) => setOpen(false)}
               style={styles.imageContainer}
            >
               <img style={styles.image} src={cancel} alt="cancel_icon"/>
            </div>

         </div>
      </div>
   );
}

export default InputElement;