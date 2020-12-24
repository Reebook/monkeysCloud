import React from 'react';
import {Draggable} from 'react-beautiful-dnd';
import './style.scss'
class Task extends React.Component {
    
    render() { 
        return ( 
            <Draggable draggableId= {this.props.task.id} index = {this.props.index}>
             {(provided)  =>(
                 <div
               
                 className="draggable-item"
                 {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  ref={provided.innerRef}
                 > 
                
                   {this.props.task.content }
                 </div>
             )}
            </Draggable>
         );
    }
}


 
export default Task;