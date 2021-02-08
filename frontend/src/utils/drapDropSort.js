import { updateTask } from '../api/tasks';
import { updateState } from '../api/states';

export const sortTasks = (source, destination, prev, key) => {
  // Creating a copy of item before removing it from state
  const sourceRef = source.droppableId;
  const destRef = destination.droppableId;
  const itemCopy = {
    ...prev[sourceRef].tasks[source.index],
  };
  //itemCopy[key] = +destRef.split('-')[0] || null;
  prev[sourceRef].tasks.splice(source.index, 1);
  // Adding to new items array location
  prev[destRef].tasks.splice(destination.index, 0, itemCopy);
  //update db
  prev[destRef].tasks.forEach(({ [key]: value, id, position }, index) => {
    const valRef = prev[destRef].id;
    if (position !== index || value !== valRef) {
      updateTask(id, {
        ...(value !== valRef && {
          /*   because it can be 0 in cause of sprint */
          [key]: valRef ? valRef : null,
        }),
        position: index,
      });
      itemCopy[key] = valRef;
    }
  });
  if (sourceRef !== destRef) {
    prev[sourceRef].tasks.forEach(({ id, position }, index) => {
      if (position !== index) updateTask(id, { position: index });
    });
  }
  return prev;
};

export const sortColumns = (source, destination, draggableId, order, columns) => {
  order.splice(source, 1);
  order.splice(destination, 0, draggableId);
  order.forEach((columnId, index) => {
    const { position, id } = columns[columnId];
    if (position !== index) {
      updateState(id, { position: index });
      columns[columnId].position = index;
    }
  });
  return order;
};
