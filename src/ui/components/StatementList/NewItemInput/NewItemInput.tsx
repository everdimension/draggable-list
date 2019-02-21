import * as React from 'react';
import { styled } from 'linaria/react';

const { useState, useRef, useEffect } = React;

const AddButton = styled.button`
  width: 100%;
  border: 2px dashed #eff0f1;
  padding: 20px;
  color: #9ea7b2;
  background-color: #fcfdfc;
`;

const AddInput = styled.input`
  display: block;
  width: 100%;
  padding: 20px;
`;

interface Props {
  onSubmit: (value: string) => void;
}

const identity = (x: any) => x;

const NewItemInput: React.SFC<Props> = ({ onSubmit = identity }) => {
  const inputRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  return (
    <div>
      {isEditing ? (
        <form
          onSubmit={event => {
            setIsEditing(false);
            const statement = event.currentTarget.elements.namedItem(
              'statement',
            ) as HTMLInputElement;
            onSubmit(statement.value);
          }}
        >
          <AddInput
            ref={inputRef}
            name="statement"
            placeholder="type something"
            type="text"
            required
          />
        </form>
      ) : (
        <AddButton onClick={() => setIsEditing(true)}>
          Add a statement
        </AddButton>
      )}
    </div>
  );
};

export { NewItemInput };
