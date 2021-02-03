import { BacklogStore } from './store';
import actions from './constants';
import axios from '../../api/axios';

const backlog = {
  id: 0,
  name: 'backlog',
};

export default function useActions() {
  const [state, dispatch] = BacklogStore.useBacklog();

  const loadSprints = async id => {
    try {
      const sprints = {};
      const { data } = await axios.get(`sprint/project/${id}?finished=false`);
      for (const item of data.sprints) {
        sprints[`${item.id}-col`] = { ...item };
      }
      Object.assign(sprints, { '0-col': backlog });
      dispatch({
        type: actions.LOAD_SPRINTS,
        payload: {
          sprints,
          project: id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const loadTasks = async id => {
    try {
      const col = `${id}-col`;
      const { data } = await axios.get(`task/project/${state.project}?sprint=${id}`);
      const prev = { ...state.sprints[col] };
      prev.tasks = data.tasks;
      dispatch({
        type: actions.SET_TASKS,
        payload: {
          [col]: prev,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onOpenModal = () => dispatch({ type: actions.OPEN_MODAL });

  const onDragEnd = ({ destination, source }) => {
    if (!destination) return;
    if (destination.index === source.index && destination.droppableId === source.droppableId) {
      return;
    }
    // Creating a copy of item before removing it from state
    const prev = { ...state.sprints };
    const itemCopy = { ...prev[source.droppableId].tasks[source.index] };
    itemCopy.state = destination.droppableId;
    // Remove from previous items array
    prev[source.droppableId].tasks.splice(source.index, 1);
    // Adding to new items array location
    prev[destination.droppableId].tasks.splice(destination.index, 0, itemCopy);
  };

  return {
    loadTasks,
    loadSprints,
    onDragEnd,
    onOpenModal,
    state,
  };
}
