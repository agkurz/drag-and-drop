/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { sortableContainer, sortableElement } from 'react-sortable-hoc';
import { Button, Grid, Paper } from '@material-ui/core/';
import arrayMove from 'array-move';

import Link from './Link';

const SortableNew = () => {
  const [newLinks, setNewLinks] = useState([
    { url: '' },
  ]);
  const [stateEdit, setStateEdit] = React.useState({
    item: 1,
  });

  const [remove, setRemove] = React.useState(true);

  const handleRemove = (index) => {
    const newArr = [...newLinks];
    newArr.splice(index - 1, 1);
    setNewLinks(newArr);
  };

  const handleSave = (value, index) => {
    if (!value) {
      handleRemove(index);
      setStateEdit({
        ...stateEdit,
        item: '',
      });
    } else {
      const newArr = [...newLinks];
      newArr[index - 1] = { url: value };
      setNewLinks(newArr);
      setStateEdit({
        ...stateEdit,
        item: '',
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
    const newArr = [...newLinks];
    newArr.unshift({ url: '' });
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
  };

  const SortableLinksContainer = sortableContainer(({ children }) => <div className="links">{children}</div>);
  const SortableLink = sortableElement(({ link, sortIndex }) => (
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
  ));
  const onSortEnd = ({ oldIndex, newIndex }) => {
    setNewLinks(arrayMove(newLinks, oldIndex, newIndex));
  };


  return (
    <>
      { remove && (
        <Grid item xs={12} sm={6} md={3} className="new">
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
                {newLinks.map((link, i) => (
                  <SortableLink
                    index={i}
                    sortIndex={i + 1}
                    key={i}
                    link={link}
                    collection="links"
                  />
                ))}
              </ul>
            </Paper>
          </SortableLinksContainer>
        </Grid>
      )}
    </>
  );
};

export default SortableNew;
