import React, { useState, Fragment } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import PopupContainer from './Popup/PopupContainer';
import PopupCard from './Popup/PopupCard';

const styles = {
   cardContainer: {
      paddingBottom: '7px',
      cursor: 'pointer'
   },
   cardBody: {
      fontSize: '16px',
      padding: '5px',
      background: '#fff',
      borderRadius: '3px',
      boxShadow: '1px 2px 3px rgba(9,30,66,.25)',
      wordWrap: 'break-word'
   }
}

const Card = ({card, cardIndex, column}) => {

   //Popup
   const [open, setOpen] = useState(false)

   return (
      <Fragment>
         <Draggable draggableId={card.id} index={cardIndex}>
            {(provided) => (
               <div
                  ref={provided.innerRef}
                  {...provided.dragHandleProps}
                  {...provided.draggableProps}
               >  
                  <div onClick={() => setOpen(true)} style={styles.cardContainer}>
                     <div style={styles.cardBody}>
                        {card.title ? card.title : "Empty :("}
                     </div>
                  </div>
               </div>
            )}
         </Draggable>
         <PopupContainer open={open} onClose={() => setOpen(false)}>
            <PopupCard card={card} cardIndex={cardIndex} column={column} />
         </PopupContainer>
      </Fragment>
   );
}

export default Card;