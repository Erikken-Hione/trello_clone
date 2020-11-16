import React, { useState } from 'react';
import InputElement from './InputElement';

const styles = {
   addContainer: {
      background: '#DEF2F1',
      padding: '10px 7px',
      cursor: 'pointer',
      boxShadow: '1px 2px 3px 1px rgba(9,30,66,.25)'
   }
}

const InputContainer = ({type, columnId}) => {

   const [open, setOpen] = useState(false)

   return (
      <div style={{paddingRight: '4px', marginBottom: '5px'}}> 
         {
            open ? (
               <InputElement setOpen={setOpen} type={type} columnId={columnId}/>
            ) : (
               <div
                  onClick={() => setOpen(true)}
                  style={styles.addContainer}
               >  
                  {
                     type === 'card' ? '+ Add another card' : '+ Add another column'
                  }
               </div>
            )
         }
      </div>
   );
}

export default InputContainer;