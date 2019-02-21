import * as React from 'react';
import { styled } from 'linaria/react';

const { useState } = React;

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

const NewItemInput: React.SFC<{}> = () => {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <div>
      {isEditing ? (
        <form onSubmit={() => setIsEditing(false)}>
          <AddInput type="text" required />
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
