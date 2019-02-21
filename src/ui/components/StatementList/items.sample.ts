const items = {
  0: { id: 0, name: 'Sweatcoin', description: 'We do love the great outdoor' },
  1: { id: 1, name: 'Redwoods', description: 'Human natue, that is' },
  2: { id: 2, name: 'Session', description: 'Walk in the park' },
};

const itemsOrder = Object.keys(items);

export const itemsState = {
  items,
  itemsOrder,
};
