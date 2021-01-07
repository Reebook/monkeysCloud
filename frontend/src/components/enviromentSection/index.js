import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import './style.scss';
import Cards from './cards.js';
import EnviromentCard from './enviromentCard.js';
import CreateEnviromentCard from './createCard.js';
import initialData from './initial-data';

class EnviromentSection extends React.Component{
    state = initialData;
    onDragEnd = result =>{
        const {destination,source,draggableId} = result;

        if (!destination) {
          return;
        }
        //
        if(destination.droppableId === source.droppableId && destination.index === source.index){
          return;
        }
  
        const start = this.state.columns[source.droppableId];
        const finish = this.state.columns[destination.droppableId]
        //
        if(start === finish){
            const newTasksIds = Array.from(start.taskIds)
            newTasksIds.splice(source.index,1);
            newTasksIds.splice(destination.index,0,draggableId);
            //
            const newColumn = {
              ...start,
              taskIds:newTasksIds
            };
            //
            const newState = {
              ...this.state,
              columns:{
                ...this.state.columns,
                [newColumn.id]:newColumn
              }
            };
            this.setState(newState);
            return;
        }
        //para mover items de un lado a otro
        const startTaskIds = Array.from(start.taskIds);
        startTaskIds.splice(source.index,1);

        const newStart = {
            ...start,
            taskIds:startTaskIds
        };

       const finishTaskIds = Array.from(finish.taskIds);
       finishTaskIds.splice(destination.index,0,draggableId);
       //
       const newFinish = {
           ...finish,
            taskIds: finishTaskIds
       };

       const newState = {
        ...this.state,
        columns:{
          ...this.state.columns,
          [newStart.id]:newStart,
          [newFinish.id]:newFinish
        }
      };
      this.setState(newState);
     
    };
    render(){
    return(
        <div className="main-container">
            <div className="header-container">
                <div className="actions-header">
                    <a href="#" className="action-button">settings</a>
                    <a href="#" className="action-button">wiki</a>
                    <a id="clone" href="#" className="action-button">clone</a>
                </div>
            </div>            
            <section className="section-container">  
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <div className="cards-section">                    
                    {this.state.columnOrder.map
                     (columnId =>{
                    const column = this.state.columns[columnId];
                    const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);
                   //
                   return <EnviromentCard key={column.id} column={column} tasks ={tasks}/>;
                     })}      
                    <CreateEnviromentCard/>                            
                    </div>
                </DragDropContext>
            </section>        
        </div>
    );
}
}
export default EnviromentSection;