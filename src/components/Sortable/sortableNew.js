/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { sortableContainer, sortableElement } from 'react-sortable-hoc';
import { Button, Grid, Paper } from '@material-ui/core/';
import PropTypes from 'prop-types';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/styles';
import arrayMove from 'array-move';
import sortableStyles from './sortableStyles';

import Link from './Link';

const SortableNew = (props) => {
  const { classes } = props;
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
        item: 0,
      });
    } else {
      const newArr = [...newLinks];
      newArr[index - 1] = { url: value };
      setNewLinks(newArr);
      setStateEdit({
        ...stateEdit,
        item: 0,
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
      editIndex={stateEdit.item || 0}
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
              <Button variant="contained" color="primary" className={classes.addButton} onClick={() => addNew()}>
                <AddIcon style={{ fontSize: 15 }} />
              </Button>
              <button type="submit" className="clearButton right" onClick={() => removeNew()}>
                <CloseIcon />
              </button>
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

SortableNew.propTypes = {
  classes: PropTypes.shape({
    addButton: PropTypes.string.isRequired,
  }),
};

SortableNew.defaultProps = {
  classes: { addButton: '' }
};

export default withStyles(sortableStyles)(SortableNew);
