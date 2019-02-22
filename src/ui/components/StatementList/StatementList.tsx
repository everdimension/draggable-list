import * as React from 'react';
import { css } from 'linaria';
import { styled } from 'linaria/react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { DragHandle } from '../ui-kit/DragHandle';
import { NewItemInput } from './NewItemInput';

const ListContainer = styled.div`
  padding-left: 0.5em;
  padding-right: 0.5em;
`;

const List = styled.div`
  & > * {
    margin-bottom: 10px;
  }
`;

const StatementItem = styled.div`
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
const listItemPaddingRight = dragHandleGap * 2 + dragHandleWidth;

const DragHandleButton = styled.div`
  user-select: none;
  padding-left: ${dragHandleGap}px;
  padding-right: ${dragHandleGap}px;
  display: flex;
  align-items: center;
`;

interface Props {
  items: {
    [id: string]: {
      id: string;
      name: string;
      description: string;
    };
  };
  order: string[];
  onReorder: (sourceIndex: number, destinationIndex: number) => void;
  onCreateNewItem: (items: { name: string; description: string }) => void;
}

export const StatementList: React.SFC<Props> = ({
  items,
  order,
  onCreateNewItem,
  onReorder,
}) => (
  <ListContainer>
    <DragDropContext
      onDragEnd={({ source, destination }) => {
        if (!destination) {
          // dropped outside of the list, no need to do anything
          return;
        }
        onReorder(source.index, destination.index);
      }}
    >
      <Droppable droppableId="droppable">
        {({ innerRef }) => (
          <List ref={innerRef}>
            {order
              .map(id => items[id])
              .map((item, index) => (
                <Draggable
                  key={item.id}
                  draggableId={String(item.id)}
                  index={index}
                >
                  {({ innerRef: ref, draggableProps, dragHandleProps }) => (
                    <DraggableItem ref={ref} {...draggableProps}>
                      <StatementItem>
                        <span
                          className={css`
                            font-weight: 500;
                          `}
                        >
                          {item.name} &middot;
                        </span>{' '}
                        <span>{item.description || <i>No description</i>}</span>
                      </StatementItem>
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
      <NewItemInput
        onSubmit={value => {
          const [name, ...otherWords] = value.split(' ');
          onCreateNewItem({
            name,
            description: otherWords.join(' '),
          });
        }}
      />
    </div>
  </ListContainer>
);
