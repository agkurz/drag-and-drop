import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core/';
import { withStyles } from '@material-ui/styles';
import LinkStyles from './LinkStyles';

const Link = (props) => {
  const [stateInput, setStateInput] = React.useState('');
  const {
    link,
    index,
    editIndex,
    handleQuery,
    handleQueryEnter,
    handleEdit,
    handleRemove,
    classes
  } = props;
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
      <button type="submit" className={`clearButton ${classes.edit}`} onClick={() => handleEdit(index)}>
        ✎
      </button>
      <button type="submit" className={`clearButton ${classes.close}`} onClick={() => handleRemove(index)}>
        ✕
      </button>
    </li>
  );
};

Link.propTypes = {
  link: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }),
  index: PropTypes.number.isRequired,
  editIndex: PropTypes.number.isRequired,
  handleQuery: PropTypes.func.isRequired,
  handleQueryEnter: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  classes: PropTypes.shape({
    close: PropTypes.string.isRequired,
    edit: PropTypes.string.isRequired,
  }),
};

Link.defaultProps = {
  link: { url: '' },
  classes: { close: '', edit: '' }
};

export default withStyles(LinkStyles)(Link);
