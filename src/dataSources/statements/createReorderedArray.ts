export function createReorderedArray(
  arr: any[],
  sourceIndex: number,
  destinationIndex: number,
) {
  const arrayCopy = [...arr];

  // remove item from its source position:
  const [item] = arrayCopy.splice(sourceIndex, 1);
  // insert item to its destination position:
  arrayCopy.splice(destinationIndex, 0, item);

  return arrayCopy;
}
