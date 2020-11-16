import React, { useState } from 'react';
import Column from '../../src/Components/Column.js';
import Data from '../Utils/Data.js';
import StoreApi from '../Utils/StoreApi.js';
import InputContainer from '../../src/Components/Input/InputContainer.js';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';

const Tasks = () => {

   const [data, setData] = useState(Data);
      
   //Update Card
   const addMoreCard = (title, columnId) => {
      const newCard = {
         id: uuidv4(),
         title: title,
         content: '',
      }
   
      const currentColumn = data.lists[columnId]
      currentColumn.cards = [...currentColumn.cards, newCard]
   
   
      const newData = {
         ...data,
         lists: {
            ...data.lists,
            [columnId]: currentColumn
         }
      }
   
      setData(newData)
   }
   
   const updateCard = (newData, cardIndex, columnId, type) => {
      const column = data.lists[columnId]
      const columnCards = column.cards
      const [removed] = columnCards.splice(cardIndex, 1)
      if (type === 'title') {
         removed.title = newData
      } else if (type === 'content') {
         removed.content = newData
      } else if (type === 'date') {
         removed.date = newData
      }
      columnCards.splice(cardIndex, 0, removed)
      setData({
         ...data,
         lists: {
            ...data.lists,
            [columnId]: {
               ...column,
               cards: columnCards
            }
         }
      })
      
   }

   const deleteCard = (cardIndex, columnId) => {
      const column = data.lists[columnId]
      const columnCards = column.cards
      columnCards.splice(cardIndex, 1)
      setData({
         ...data,
         lists: {
            ...data.lists,
            [columnId]: {
               ...column,
               cards: columnCards
            }
         }
      })
   }


   //Update Column
   const addMoreColumn = (title) => {
      const newColumnId = uuidv4()
      const newColumn = {
         id: newColumnId,
         title: title,
         description: '',
         cards: []
      }
   
      const newData = {
         listIds: [...data.listIds, newColumnId],
         lists: {
            ...data.lists,
            [newColumnId]: newColumn
         }
      }
   
      setData(newData)
   }

   const updateColumn = (newData, columnId, type) => {
      const column = data.lists[columnId]
      
      if (type === 'title') {
         column.title = newData
      } else if (type === 'description') {
         column.description = newData
      }
   
      const newColumnTitle = {
         ...data,
         lists: {
            ...data.lists,
            [columnId]: column
         }
      }
   
      setData(newColumnTitle)
   }

   const deleteColumn = (columnId, columnIndex) => {
      const columnIds = data.listIds
      columnIds.splice(columnIndex, 1)
      
      const columns = data.lists
      delete columns[columnId]

      setData({
         ...data,
         lists: columns,
         listIds: columnIds
      })
   }


   //Update indexes
   const onDragEnd = (result, data, setData) => {
   
      const { destination, source, type } = result
      if (!destination || !source) {
         return
      }
   
      if (type === "column") {
         const newColumnId = data.listIds;
         const [removed] = newColumnId.splice(source.index, 1)
         newColumnId.splice(destination.index, 0, removed)
         setData({
            ...data,
            listsIds: newColumnId
         })
         return
      }
   
      const sourceColumn = data.lists[source.droppableId]
      const destinationColumn = data.lists[destination.droppableId]
   
      if (destination.droppableId !== source.droppableId) {
         const dragColumn = [...sourceColumn.cards]
         const dropColumn = [...destinationColumn.cards]
         const [removed] = dragColumn.splice(source.index, 1)
         dropColumn.splice(destination.index, 0, removed);
         setData({
            ...data,
            lists: {
               ...data.lists,
               [sourceColumn.id]: {
                  ...sourceColumn,
                  cards: dragColumn
               },
               [destinationColumn.id]: {
                  ...destinationColumn,
                  cards: dropColumn
               }
            }
         })
      } else {
         const copiedCards = [...sourceColumn.cards]
         const [removed] = copiedCards.splice(source.index, 1);
         copiedCards.splice(destination.index, 0, removed)
         setData({
            ...data,
            lists: {
               ...data.lists,
               [sourceColumn.id]: {
                  ...sourceColumn,
                  cards: copiedCards
               }
            }
         })
      }
   }
   
   return (
      <StoreApi.Provider value={{ addMoreCard, addMoreColumn, updateColumn, deleteColumn,updateCard, deleteCard }}>
            <DragDropContext onDragEnd={result => onDragEnd(result, data, setData)}>
               <Droppable droppableId="tasks" type="column" direction="horizontal">
                  {(provided, snapshot) => (
                     <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className = "tasks__body"
                        style={{
                           display: 'inline-flex',
                           width: '100vw',
                           height: '100vh',
                           paddingBottom: '40px',
                           overflowX: 'auto',
                           overflowY: 'hidden'
                        }}>
                           {
                              data.listIds.map((listId, index) => (
                                 <Column column={data.lists[listId]} key={listId} index={index} />
                              ))
                           }
                           <div style={{opacity: snapshot.isDraggingOver ? 0 : 1, margin: '5px 5px 0px 5px', minWidth: '240px', maxWidth: '240px'}}>
                              <InputContainer type="column"/>
                           </div>
                           {provided.placeholder}
                     </div>
                  )}
               </Droppable>
            </DragDropContext>
      </StoreApi.Provider>

   )
}

export default Tasks;