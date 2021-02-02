import { BacklogStore } from './store';
import actions from './constants';

export default function useActions() {
  const [state, dispatch] = BacklogStore.useBacklog();

  const onOpenModal = () => dispatch({ type: actions.openModal });

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
    onDragEnd,
    onOpenModal,
    state,
  };
}
