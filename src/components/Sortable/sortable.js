import React, { useState } from 'react';
import { sortableContainer, sortableElement } from 'react-sortable-hoc';
import { Button, Grid, Paper } from '@material-ui/core/';
import arrayMove from 'array-move';

import Link from './Link';

const Sortable = () => {
  const [links, setLinks] = useState([
    { url: 'https://www.link1.com' },
    { url: 'https://www.link2.com' },
    { url: 'https://www.link3.com' },
    { url: 'https://www.link4.com' }
  ]);

  const [stateEdit, setStateEdit] = React.useState({
    item: ''
  });

  const [remove, setRemove] = React.useState(true);

  const handleRemove = (index) => {
    const newArr = [...links];
    newArr.splice(index - 1, 1);
    setLinks(newArr);
  };

  const handleSave = (value, index) => {
    if (!value) {
      handleRemove(index);
      setStateEdit({
        ...stateEdit,
        item: ''
      });
    } else {
      const newArr = [...links];
      newArr[index - 1] = { url: value };
      setLinks(newArr);
      setStateEdit({
        ...stateEdit,
        item: ''
      });
    }
  };

  const handleQuery = (value, index) => {
    handleSave(value, index);
  };

  const handleQueryEnter = (e, value, index) => {
    if (e.key === 'Enter') {
      handleSave(value, index);
    }
  };

  const addNew = () => {
    const newArr = [...links];
    newArr.unshift({ url: '' });
    setLinks(newArr);
    setStateEdit({
      ...stateEdit,
      item: 1
    });
  };

  const removeNew = () => {
    setLinks([]);
    setRemove(false);
  };

  const handleEdit = (index) => {
    setStateEdit({
      ...stateEdit,
      item: index
    });
  };

  const SortableLinksContainer = sortableContainer(({ children }) => (
    <div className="links">{children}</div>
  ));
  const SortableLink = sortableElement(({ link, sortIndex }) => (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
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
  ));

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setLinks(arrayMove(links, oldIndex, newIndex));
  };

  return (
    <Grid item xs={12} sm={6} md={3}>
      {remove && (
        <SortableLinksContainer
          onSortEnd={onSortEnd}
          onSortStart={(_, event) => event.preventDefault()}
        >
          <Paper>
            <Button variant="contained" color="primary" onClick={() => addNew()}>
              Add item to list
            </Button>
            <Button variant="contained" color="secondary" onClick={() => removeNew()}>
              Remove list
            </Button>
            <ul>
              {links.map((link, i) => (
                <SortableLink
                  disabled={!!stateEdit.item}
                  index={i}
                  sortIndex={i + 1}
                  // eslint-disable-next-line react/no-array-index-key
                  key={i}
                  link={link}
                />
              ))}
            </ul>
          </Paper>
        </SortableLinksContainer>
      )}
    </Grid>
  );
};

export default Sortable;
