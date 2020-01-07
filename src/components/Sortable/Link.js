/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core/';

const Link = ({
  link,
  index,
  editIndex,
  handleQuery,
  handleQueryEnter,
  handleEdit,
  handleRemove
}) => {
  const [stateInput, setStateInput] = React.useState('');
  return (
    <li>
      <span>#{index} </span>
      {index === editIndex ? (
        <TextField
          id="standard-basic"
          margin="normal"
          onChange={(e) => setStateInput(e.target.value)}
          onBlur={(e) => handleQuery(
            stateInput || (e.target.value === link.url && link.url), index
          )}
          onKeyDown={(e) => handleQueryEnter(
            e, stateInput || (e.target.value === link.url && link.url), index
          )}
          defaultValue={stateInput || link.url}
          key={index}
        />
      ) : (
        stateInput || link.url
      )}
      <button type="submit" onClick={() => handleEdit(index)}>
        Edit
      </button>
      <button type="submit" onClick={() => handleRemove(index)}>
        Remove
      </button>
    </li>
  );
};

Link.propTypes = {
  link: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  editIndex: PropTypes.number.isRequired,
  handleQuery: PropTypes.func.isRequired,
  handleQueryEnter: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired
};

export default Link;
