import React from 'react';
import {  Droppable } from 'react-beautiful-dnd';
import './style.scss';
import PopUp from './popUp.js';
import Task from './task';

class EnviromentCard extends React.Component{
    state = {
        seen:false
    };

    togglePop = () =>{
        this.setState({
            seen: !this.state.seen
        });
    }
    render(){
        return (
            <section >
                <div className="enviroment-card" onClick={this.togglePop}>
                <h3 className="github-title">{this.props.column.title}</h3>
                <Droppable droppableId={this.props.column.id} >
                   {(provided) => (
                       <div
                       className="enviroment-card-content"
                       ref ={provided.innerRef}
                       {...provided.droppableProps} 
                       >
                      {this.props.tasks.map((task,index)=> (<Task key={task.id} task={task} index={index}/>))}
                        {provided.placeholder}
                       </div>
                   )}
                </Droppable>
                </div>
                {this.state.seen ? <PopUp toggle={this.togglePop} /> : null}
            </section>
        );
    }
  
}

export default EnviromentCard;