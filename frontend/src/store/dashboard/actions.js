import actions from './constants';
import axios from '../../api/axios';
import { DashboardStore } from './store';

export default function useActions() {
  const [state, dispatch] = DashboardStore.useDashboard();

  const getData = async id => {
    const columns = {};
    const columnOrder = [];
    try {
      const { data } = await axios.get(`state/project/${id}/tasks`);
      for (const state of data.states) {
        const columnName = `${state.id}-column`;
        columns[columnName] = { ...state };
        columnOrder.push(columnName);
      }
      dispatch({
        type: actions.GET_DATA,
        payload: {
          columns,
          columnOrder,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const onDragEnd = ({ destination, source, draggableId, type }) => {
    if (!destination) return;
    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    ) {
      return;
    }
    const { columns, columnOrder } = state;
    if (type === 'task') {
      // Creating a copy of item before removing it from state
      const sourceRef = source.droppableId;
      const destRef = destination.droppableId;
      const itemCopy = {
        ...columns[sourceRef].tasks[source.index],
      };
      itemCopy.state = destRef.split('-')[0];
      const prevColumns = { ...columns };
      prevColumns[sourceRef].tasks.splice(source.index, 1);
      // Adding to new items array location
      prevColumns[destRef].tasks.splice(destination.index, 0, itemCopy);
      //update database
      prevColumns[destRef].tasks.forEach(({ id, position, state }, index) => {
        const stateRef = prevColumns[destRef].id;
        if (position !== index || state !== stateRef) {
          axios.patch(`task/update/${id}`, {
            ...(state !== stateRef && {
              state: stateRef,
            }),
            position: index,
          });
        }
      });
      if (sourceRef !== destRef) {
        prevColumns[sourceRef].tasks.forEach(({ id, position }, index) => {
          if (position !== index)
            axios.patch(`task/update/${id}`, { position: index });
        });
      }
      ////////////////////////
      dispatch({ type: actions.UPDATE_TASKS, payload: prevColumns });
      return;
    }
    const newOrder = [...columnOrder];
    newOrder.splice(source.index, 1);
    newOrder.splice(destination.index, 0, draggableId);
    newOrder.forEach((columnId, index) => {
      const { position, id } = columns[columnId];
      if (position !== index) {
        axios.patch(`state/update/${id}`, { position: index });
        columns[columnId].position = index;
      }
    });
    dispatch({ type: actions.UPDATE_COLUMNS, payload: newOrder });
  };

  const openSprintModal = () => dispatch({ type: actions.SET_SPRINT_MODAL });

  const openNewStateModal = () =>
    dispatch({ type: actions.SET_NEWSTATE_MODAL });

  return {
    getData,
    onDragEnd,
    openSprintModal,
    openNewStateModal,
    state,
  };
}
