
import React, { useState } from 'react';
import { sortableContainer, sortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';

import Link from './Link';

const SortableNew = () => {
  const [newLinks, setNewLinks] = useState([
    { url: ''},
  ]);
  
  const [stateEdit, setStateEdit] = React.useState({
    item: 1,
  });

  const [remove, setRemove] = React.useState(true);

  const handleSave = (value, index) => {
    if (!value) {
      handleRemove(index);
      setStateEdit({
        ...stateEdit,
        item: '',
      });
    } else {
      let newArr = [...newLinks];
      newArr[index-1] = {url: value};
      setNewLinks(newArr);
      setStateEdit({
        ...stateEdit,
        item: '',
      });
    }
  }


  const handleQuery = (value, index) => {
    handleSave(value, index);
  };

  const handleQueryEnter = (e, value, index) => {
    if (e.key === 'Enter') {
      handleSave(value, index);
    }
  };

  const addNew = () => {
    let newArr = [...newLinks];
    newArr.unshift({url: ''});
    setNewLinks(newArr);
    setStateEdit({
      ...stateEdit,
      item: 1,
    });
  }; 

  const removeNew = () => {
    setNewLinks([]);
    setRemove(false);
  }; 

  const handleEdit = (index) => {
    setStateEdit({
      ...stateEdit,
      item: index,
    });
  }

  const handleRemove = (index) => {
    let newArr = [...newLinks];
    newArr.splice(index-1,1);
    setNewLinks(newArr);
  }
  
  const SortableLinksContainer = sortableContainer(({ children }) => <div className="links">{children}</div>);
  const SortableLink = sortableElement(({ link, sortIndex }) => 
    <Link
      key={sortIndex}
      index={sortIndex}
      link={link}
      disabled={!!stateEdit.item}
      editIndex={stateEdit.item}
      handleQuery={handleQuery}
      handleEdit={handleEdit}
      handleQueryEnter={handleQueryEnter}
      handleRemove={handleRemove}
    />
  );
  
  const onSortEnd = ({ oldIndex, newIndex, collection }) => {
    setNewLinks(arrayMove(newLinks, oldIndex, newIndex));
  }


  return (
    <div className="new">
      { remove && 
      <SortableLinksContainer onSortEnd={onSortEnd} onSortStart={(_, event) => event.preventDefault()} >
        <button onClick={() => addNew()}>
          Add item to list
        </button>
        <button onClick={() => removeNew()}>
          Remove list
        </button>
        <ul>
          {newLinks.map((link, i) => <SortableLink 
                index={i}
                sortIndex={i+1}
                key={i}
                link={link}
                collection="links"
            />)}
        </ul>
      </SortableLinksContainer>
      }
    </div>
  );
}

export default SortableNew;