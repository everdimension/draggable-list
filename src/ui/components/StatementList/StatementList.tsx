import * as React from 'react';
import { css } from 'linaria';
import { styled } from 'linaria/react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { DragHandle } from '../ui-kit/DragHandle';

const items = [
  { id: 0, name: 'Sweatcoin', description: 'We do love the great outdoor' },
  { id: 1, name: 'Redwoods', description: 'Human natue, that is' },
  { id: 2, name: 'Session', description: 'Walk in the park' },
];

const listStyles = css`
  & > * + * {
    margin-top: 10px;
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

const DragHandleButton = styled.div`
  padding-left: 1em;
  display: flex;
  align-items: center;
`;

export const StatementList: React.SFC<{}> = () => (
  <DragDropContext onDragEnd={() => console.log('dragend')}>
    <Droppable droppableId="droppable">
      {({ innerRef }) => (
        <div className={listStyles} ref={innerRef}>
          {items.map((item, index) => (
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
                    <DragHandle style={{ width: 20, color: '#b1bccb' }} />
                  </DragHandleButton>
                </DraggableItem>
              )}
            </Draggable>
          ))}
        </div>
      )}
    </Droppable>
  </DragDropContext>
);
