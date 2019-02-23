import NanoEvents from 'nanoevents';
import nanoid from 'nanoid';
import { createReorderedArray } from './createReorderedArray';

interface ItemBase {
  name: string;
  description: string;
}

interface Item extends ItemBase {
  id: string;
}

interface State {
  items: {
    [id: string]: Item;
  };
  order: string[];
}

export class Source {
  state: State;

  emitter: NanoEvents<any>;

  constructor() {
    this.emitter = new NanoEvents();
    this.state = {
      items: {},
      order: [],
    };

    this.setItems = this.setItems.bind(this);
    this.createNewItem = this.createNewItem.bind(this);
    this.reorder = this.reorder.bind(this);
  }

  subscribe(listener: (state: any) => any) {
    return this.emitter.on('update', listener);
  }

  emit() {
    this.emitter.emit('update', this.state);
  }

  getState() {
    return this.state;
  }

  setItems(items: State['items']) {
    this.state.items = items;
    this.state.order = Object.keys(items);
    this.emit();
  }

  createNewItem(item: ItemBase) {
    const id = nanoid();

    const { items, order } = this.state;
    this.state.items = {
      ...items,
      [id]: {
        ...item,
        id,
      },
    };
    this.state.order = [...order, id];
    this.emit();
  }

  reorder(sourceIndex: number, destinationIndex: number) {
    const { order } = this.state;
    this.state.order = createReorderedArray(
      order,
      sourceIndex,
      destinationIndex,
    );
    this.emit();
  }
}
