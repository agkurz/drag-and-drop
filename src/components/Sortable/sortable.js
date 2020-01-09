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

const Sortable = (props) => {
  const { classes } = props;
  const [links, setLinks] = useState([
    { url: 'https://www.link1.com' },
    { url: 'https://www.link2.com' },
    { url: 'https://www.link3.com' },
    { url: 'https://www.link4.com' }
  ]);

  const [stateEdit, setStateEdit] = React.useState({
    item: 0
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
        item: 0
      });
    } else {
      const newArr = [...links];
      newArr[index - 1] = { url: value };
      setLinks(newArr);
      setStateEdit({
        ...stateEdit,
        item: 0
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
            <Button variant="contained" color="primary" className={classes.addButton} onClick={() => addNew()}>
              <AddIcon style={{ fontSize: 15 }} />
            </Button>
            <button type="submit" className="clearButton right" onClick={() => removeNew()}>
              <CloseIcon />
            </button>
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

Sortable.propTypes = {
  classes: PropTypes.shape({
    addButton: PropTypes.string.isRequired,
  }),
};

Sortable.defaultProps = {
  classes: { addButton: '' }
};

export default withStyles(sortableStyles)(Sortable);
