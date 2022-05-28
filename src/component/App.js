import React, { useReducer, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Battle from './Battle';
import Nav from './Nav';
import TopStar from './TopStar';
import Winner from './Winner';
import MyContext from '../contextAPI/context';

const initialState = {
  inputOne: '',
  inputTwo: '',
  dataOne: null,
  dataTwo: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'setInputOne':
      state = { ...state, inputOne: action.payload };
      break;
    case 'setInputTwo':
      state = { ...state, inputTwo: action.payload };
      break;
    case 'setDataOne':
      state = { ...state, dataOne: action.payload, inputOne: '' };
      break;
    case 'setDataTwo':
      state = { ...state, dataTwo: action.payload, inputTwo: '' };
      break;
    case 'removePlayerOne':
      state = { ...state, dataOne: null, inputOne: '' };
      break;
    case 'removePlayerTwo':
      state = { ...state, dataTwo: null, inputTwo: '' };
      break;
    case 'reset':
      state = initialState;
      break;
    default:
      break;
  }
  return state;
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isDarkMode, setDarkMode] = useState(false);

  const handleSubmit = (event, input, playerData) => {
    event.preventDefault();
    if (state[input]) {
      fetch(`https://api.github.com/users/${state[input]}`)
        .then((res) => res.json())
        .then((data) => {
          if (playerData === 'dataOne') {
            dispatch({ type: 'setDataOne', payload: data });
          } else {
            dispatch({ type: 'setDataTwo', payload: data });
          }
        });
    }
  };

  const handleChange = ({ target }) => {
    let { name, value } = target;
    if (name === 'inputOne') {
      dispatch({ type: 'setInputOne', payload: value });
    } else {
      dispatch({ type: 'setInputTwo', payload: value });
    }
  };

  const handleRemovePlayer = (player, data) => {
    if (player === 'inputOne') {
      dispatch({ type: 'removePlayerOne' });
    } else {
      dispatch({ type: 'removePlayerTwo' });
    }
  };

  const handleReset = () => {
    dispatch({ type: 'reset' });
  };
  return (
    <div className={`container ${isDarkMode ? 'darkmode' : ''}`}>
      <MyContext.Provider value={isDarkMode}>
        <Nav isDarkMode={isDarkMode} setDarkMode={setDarkMode} />
        <div className='width-90'>
          <Routes>
            <Route path='/' element={<TopStar />} exact />
            <Route
              path='/battle'
              element={
                <Battle
                  handleSubmit={handleSubmit}
                  userData={state}
                  handleReset={handleReset}
                  handleRemovePlayer={handleRemovePlayer}
                  handleChange={handleChange}
                />
              }
            />
            <Route
              path='/battle/result'
              element={<Winner state={state} handleReset={handleReset} />}
            />
          </Routes>
        </div>
      </MyContext.Provider>
    </div>
  );
}

export default App;
