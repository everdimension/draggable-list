import { createSubscription } from 'create-subscription';
import { Source } from './Source';

interface Data {
  data: Source['state'];
  createNewItem: Source['createNewItem'];
  reorder: Source['reorder'];
}

export const StatementsSubscription = createSubscription<Source, Data>({
  getCurrentValue(source) {
    const state = source.getState();
    const { createNewItem, reorder } = source;

    return {
      data: state,
      createNewItem,
      reorder,
    };
  },
  subscribe(source, callback) {
    return source.subscribe(state => {
      const { createNewItem, reorder } = source;

      callback({
        data: state,
        createNewItem,
        reorder,
      });
    });
  },
});
