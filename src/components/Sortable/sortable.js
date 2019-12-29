
import React, { useState } from 'react';
import { sortableContainer, sortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';

import Link from './Link';

const Sortable = () => {
  const [links, setLinks] = useState([
    { url: 'https://www.link1.com'},
    { url: 'https://www.link2.com'},
    { url: 'https://www.link3.com'},
    { url: 'https://www.link4.com'},
  ]);

  const [stateEdit, setStateEdit] = React.useState({
    item: '',
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
      let newArr = [...links]; // copying the old datas array
      newArr[index-1] = {url: value}; // replace e.target.value with whatever you want to change it to
      setLinks(newArr);
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
    let newArr = [...links];
    newArr.unshift({url: ''});
    setLinks(newArr);
    setStateEdit({
      ...stateEdit,
      item: 1,
    });
  }; 

  const removeNew = () => {
    setLinks([]);
    setRemove(false);
  }; 

  const handleEdit = (index) => {
    setStateEdit({
      ...stateEdit,
      item: index,
    });
  }

  const handleRemove = (index) => {
    let newArr = [...links];
    newArr.splice(index-1,1);
    setLinks(newArr);
  }
  
  const SortableLinksContainer = sortableContainer(({ children }) => <div className="links">{children}</div>);
  const SortableLink = sortableElement(({ link, sortIndex }) => 
    <Link
      key={sortIndex}
      index={sortIndex}
      link={link}
      editIndex={stateEdit.item}
      handleQuery={handleQuery}
      handleEdit={handleEdit}
      handleQueryEnter={handleQueryEnter}
      handleRemove={handleRemove}
    />
  );
  
  const onSortEnd = ({ oldIndex, newIndex, collection }) => {
    setLinks(arrayMove(links, oldIndex, newIndex));
  }

  return (
    <div>
      { remove && 
      <SortableLinksContainer onSortEnd={onSortEnd} onSortStart={(_, event) => event.preventDefault()}>
        <button onClick={() => addNew()}>
          Add item to list
        </button>
        <button onClick={() => removeNew()}>
          Remove list
        </button>
        <ul>
        {links.map((link, i) =>
          <SortableLink
            disabled={!!stateEdit.item}
            index={i}
            sortIndex={i+1}
            key={i}
            link={link}
            collection="links"
          />
        )}
        </ul>
      </SortableLinksContainer>
    }
    </div>
  );
}

export default Sortable;