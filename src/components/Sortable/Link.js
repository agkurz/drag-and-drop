import React from 'react';
import PropTypes from 'prop-types';

const Link = ({ link, index, editIndex, handleQuery, handleQueryEnter, handleEdit, handleRemove }) =>  {

  const [stateInput, setStateInput] = React.useState('');
  return (
    <li>
      {index === editIndex ?
        <input
            type="text"
            name="name"
            onChange={(e) => setStateInput(e.target.value)}
            onBlur={() => handleQuery(stateInput, index)}
            onKeyDown={(e) => handleQueryEnter(e, stateInput, index)}
            defaultValue={stateInput || link.url}
            key={index}
          /> : 
          stateInput || link.url
      }
      <button onClick={(e) => handleEdit(index)}>Edit</button>
      <button onClick={(e) => handleRemove(index)}>Remove</button>
    </li>
  )
};

Link.propTypes = {
  link: PropTypes.object.isRequired,
};

export default Link;