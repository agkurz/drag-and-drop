import React from 'react';
import { Button, Grid } from '@material-ui/core/';
import Sortable from './components/Sortable/sortable';
import SortableNew from './components/Sortable/sortableNew';
import './App.css';

function App() {
  const [theArray, setTheArray] = React.useState([]);
  const addNew = () => {
    const newArr = [...theArray];
    newArr.unshift(<SortableNew key={Math.random()} />);
    setTheArray(newArr);
  };

  return (
    <div className="App">
      <h1>Drag the Links around</h1>
      <Button variant="contained" color="primary" onClick={() => addNew()}>
        Add List
      </Button>
      <Grid container spacing={3}>
        {theArray}
        <Sortable />
      </Grid>
    </div>
  );
}

export default App;
