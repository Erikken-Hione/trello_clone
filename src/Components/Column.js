import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import Card from './Card';
import InputContainer from './Input/InputContainer';
import Title from './Title';

const styles = {
   columnContainer: {
      margin: '5px',
      paddingLeft: '4px',
      width: '240px',
      maxHeight: '100%',
      display: 'flex',
      flexDirection: 'column',
      // background: '#c1e8e6',
      background: 'linear-gradient( #93e6de, #c1e8e6 )',
      borderRadius: '3px',
      boxShadow: '1px 4px 5px rgba(9,30,66,.25)'
   },
   cards: {
      marginBottom: '5px',
      overflowX: 'hidden',
      overflowY: 'auto',
      paddingRight: '2px',
      marginRight: '2px'
   }
}

const Column = ({column, index}) => {
   return (
         <Draggable draggableId={column.id} index={index}>
            {(provided) => (
               <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
               >  
                  <div className="column_container" style={styles.columnContainer}>
                     <div {...provided.dragHandleProps}>
                        <Title column={column} index={index}/>
                     </div>
                     <Droppable droppableId={column.id}>
                        {(provided, snapshot) => (
                           <div
                              ref={provided.innerRef} 
                              {...provided.droppableProps}
                              className="cards__container"
                              style={{background: snapshot.draggingOverWith ? '#f5fcfc' : null, ...styles.cards}}
                           >
                              {
                                 column.cards.map((card, cardIndex) => (
                                    <Card card={card} cardIndex={cardIndex} key={card.id} column={column}/>
                                 ))
                              }
                              {provided.placeholder}
                           </div>
                        )}
                     </Droppable>
                     <InputContainer type='card' columnId={column.id}/>
                  </div>
               </div>
            )}

         </Draggable>
   );
}

export default Column;