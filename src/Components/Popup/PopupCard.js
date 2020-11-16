import React, { useContext, Fragment, useState } from 'react';
import TextareaAutosize from 'react-autosize-textarea/lib';
import StoreApi from '../../Utils/StoreApi';
import checklists from '../../Image/checklists.png';
import memo from '../../Image/memo.png';
import trash from '../../Image/delete.png';
import calendar from '../../Image/calendar.png';

const styles = {
   container: {
      margin: '10px 10px 20px 45px',
      position: 'relative'
   },
   textarea: {
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

const PopupCard = ({card, cardIndex, column}) => {

   const { updateCard, deleteCard } = useContext(StoreApi)

   const [cardTitle, setCardTitle] = useState(card.title)
   const cardTitleHandler = (e) => {
      setCardTitle(e.target.value)
   }

   const [cardContent, setCardContent] = useState(card.content)
   const cardContentHandler = (e) => {
      setCardContent(e.target.value)
   }

   const [dateValue, setDateValue] = useState(card.date)
   const dateValueHandler = (e) => {
      setDateValue(e.target.value)
   }

   return (
      <Fragment>
         <div style={{fontSize: 14,...styles.container}}>
            <TextareaAutosize 
               value={cardTitle}
               onChange={cardTitleHandler}
               onBlur={() => updateCard(cardTitle, cardIndex, column.id, 'title')}
               maxRows={5}
               spellCheck="false"
               style={{fontSize: 20,...styles.textarea}}
            />
            <div>
               in {column.title}
            </div>
            <div style={styles.image}>
               <img src={checklists} alt="popup_checklists"/>
            </div>
         </div>
         <div style={styles.container}>
            <p style={styles.p}>Description :</p>
            <TextareaAutosize 
               style={styles.textarea}
               maxRows={4}
               value={cardContent}
               onChange={cardContentHandler}
               spellCheck='false'
               onBlur={() => updateCard(cardContent, cardIndex, column.id, 'content')}
               
            />
            
            <div style={styles.image}>
               <img src={memo} alt="popup_memo"/>
            </div>
         </div>
         
         <div style={styles.container}>
            <p style={styles.p}>Date :</p>

            <input 
               type="date" 
               style={styles.date}
               value={dateValue}
               onChange={dateValueHandler}
               onBlur={() => updateCard(dateValue, cardIndex, column.id, 'date')}   
            />

            <div style={styles.image}>
               <img src={calendar} alt="popup_calendar" />
            </div>

         </div>

         <div style={styles.container}>
            <button
               onClick={() => deleteCard(cardIndex, column.id)}
               style={styles.button}
            >
               <img src={trash} alt="delete_icon" style={styles.img}/>
            </button>
         </div>
      </Fragment>
   );
}

export default PopupCard;