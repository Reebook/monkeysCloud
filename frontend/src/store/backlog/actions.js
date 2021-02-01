import { BacklogStore } from './store';
import actions from './constants';

export default function useActions() {
  const [state, dispatch] = BacklogStore.useBacklog();

  const onOpenModal = () => dispatch({ type: actions.openModal });

  return {
    onOpenModal,
    state,
  };
}
