import React, { useState, useEffect, useContext } from 'react';
import { FaUserAlt } from 'react-icons/fa';
import { AiFillStar, AiOutlineFork } from 'react-icons/ai';
import { Link } from 'react-router-dom';

import MyContext from '../contextAPI/context';

function Winner(props) {
  const [scoreOne, setScoreOne] = useState(0);
  const [scoreTwo, setScoreTwo] = useState(0);
  const [data, setData] = useState({ scoreOne: 0, scoreTwo: 0 });

  useEffect(() => {
    let { dataOne, dataTwo } = props.state;
    let { scoreOne, scoreTwo } = data;
    if (dataOne.message !== 'Not Found' && dataTwo.message !== 'Not Found') {
      setScoreOne(dataOne.followers * 20 + dataOne.public_repos);
      setScoreTwo(dataTwo.followers * 20 + dataTwo.public_repos);
      scoreOne = dataOne.followers * 20 + dataOne.public_repos;
      scoreTwo = dataTwo.followers * 20 + dataTwo.public_repos;
      setData({ scoreOne, scoreTwo });
    }
  }, []);
  const contextInfo = useContext(MyContext);
  console.log(contextInfo, 'Winner');

  return (
    <div className='winner'>
      {props.state.dataOne.message || props.state.dataTwo.message ? (
        <>
          <h2 className='not-found'>Match Not found</h2>
          <Link to='/battle'>
            <span onClick={props.handleReset} className='submit-dark reset'>
              RESET
            </span>
          </Link>
        </>
      ) : (
        <div>
          <ul className='battle-player-holder flex'>
            <li className='card'>
              <span className='rank'>
                {scoreTwo < scoreOne
                  ? 'Winner'
                  : scoreTwo > scoreOne
                  ? 'Loser'
                  : scoreTwo === scoreOne
                  ? 'Tie'
                  : ''}
              </span>
              <img
                src={props.state.dataOne.avatar_url}
                className='card-img'
                alt={props.state.dataOne.id}
              />
              <h2 className='score'>Score: {scoreOne}</h2>
              <h2 className='card-username playerName'>
                {' '}
                {props.state.dataOne.login}
              </h2>
              <h2 className='card-stars'>
                {' '}
                {<FaUserAlt />} {props.state.dataOne.followers} Followers
              </h2>
              <h2 className='card-stars'>
                {' '}
                {<AiFillStar />} {props.state.dataOne.following} Following
              </h2>
              <h2 className='card-fork'>
                {' '}
                {<AiOutlineFork />} {props.state.dataOne.public_repos}{' '}
                repositories
              </h2>
            </li>
            <li className='card'>
              <span className='rank'>
                {scoreTwo > scoreOne
                  ? 'Winner'
                  : scoreTwo < scoreOne
                  ? 'Loser'
                  : scoreTwo === scoreOne
                  ? 'Tie'
                  : ''}
              </span>
              <img
                src={props.state.dataTwo.avatar_url}
                className='card-img'
                alt={props.state.dataTwo.id}
              />
              <h2 className='score'>Score: {scoreTwo}</h2>
              <h2 className='card-username playerName'>
                {' '}
                {props.state.dataTwo.login}
              </h2>
              <h2 className='card-username'>
                {' '}
                {<FaUserAlt />} {props.state.dataTwo.followers} Followers
              </h2>
              <h2 className='card-stars'>
                {' '}
                {<AiFillStar />} {props.state.dataTwo.following} Following
              </h2>
              <h2 className='card-fork'>
                {' '}
                {<AiOutlineFork />} {props.state.dataTwo.public_repos}{' '}
                repositories
              </h2>
            </li>
          </ul>
          <Link to='/battle'>
            <span
              onClick={props.handleReset}
              className='submit-dark reset pointer'
            >
              RESET
            </span>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Winner;
