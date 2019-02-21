import * as React from 'react';
import { css } from 'linaria';
import { styled } from 'linaria/react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { DragHandle } from '../ui-kit/DragHandle';
import { itemsState as initialItemsState } from './items.sample';
import { createReorderedArray } from './createReorderedArray';
import { NewItemInput } from './NewItemInput';

const { useState } = React;

const ListContainer = styled.div`
  padding-left: 0.5em;
  padding-right: 0.5em;
`;

const List = styled.div`
  & > * {
    margin-bottom: 10px;
  }
`;

const itemStyles = css`
  padding: 20px;
  background-color: #f4f6f7;
  border: 1px solid #bec8d3;
  color: #17486c;
`;

const DraggableItem = styled.div`
  display: flex;

  & > *:first-child {
    flex-grow: 1;
  }
`;

const dragHandleGap = 20;
const dragHandleWidth = 20;
const listItemPaddingRight = dragHandleGap + dragHandleWidth;

const DragHandleButton = styled.div`
  padding-left: ${dragHandleGap}px;
  display: flex;
  align-items: center;
`;

export const StatementList: React.SFC<{}> = () => {
  const [items] = useState(initialItemsState.items);
  const [itemsOrder, setItemsOrder] = useState(initialItemsState.itemsOrder);

  return (
    <ListContainer>
      <DragDropContext
        onDragEnd={({ source, destination }) => {
          if (!destination) {
            // dropped outside of the list
            return;
          }
          const reorderedItems = createReorderedArray(
            itemsOrder,
            source.index,
            destination.index,
          );
          console.log({ itemsOrder, reorderedItems });
          setItemsOrder(reorderedItems);
        }}
      >
        <Droppable droppableId="droppable">
          {({ innerRef }) => (
            <List ref={innerRef}>
              {itemsOrder
                .map(id => items[id])
                .map((item, index) => (
                  <Draggable
                    key={item.id}
                    draggableId={String(item.id)}
                    index={index}
                  >
                    {({ innerRef: ref, draggableProps, dragHandleProps }) => (
                      <DraggableItem ref={ref} {...draggableProps}>
                        <div className={itemStyles}>
                          <span
                            className={css`
                              font-weight: 500;
                            `}
                          >
                            {item.name} &middot;
                          </span>{' '}
                          <span>{item.description}</span>
                        </div>
                        <DragHandleButton {...dragHandleProps}>
                          <DragHandle
                            style={{ width: dragHandleWidth, color: '#b1bccb' }}
                          />
                        </DragHandleButton>
                      </DraggableItem>
                    )}
                  </Draggable>
                ))}
            </List>
          )}
        </Droppable>
      </DragDropContext>
      <div style={{ paddingRight: listItemPaddingRight }}>
        <NewItemInput />
      </div>
    </ListContainer>
  );
};
