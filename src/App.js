import React from 'react';
import Sortable from './components/Sortable/sortable'
import SortableNew from './components/Sortable/sortableNew';
import './App.css';

function App() {

  const [theArray, setTheArray] = React.useState([]);
	const addNew = () => {
    let newArr = [...theArray];
    newArr.unshift(<SortableNew key={Math.random()} />)
    setTheArray(newArr);

  };

  return (
       <div className="App">
        <h1>Drag the Links around</h1>
        <button onClick={() => addNew()}>
          Add List
        </button>
        {theArray}
        <Sortable />
      </div>
  );
}

export default App;