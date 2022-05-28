import React, { useContext } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { FaPlane, FaTrophy } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import MyContext from '../contextAPI/context';

function Battle(props) {
  const contextInfo = useContext(MyContext);
  return (
    <div className='battle-page'>
      <section className='battle-hero'>
        <h2 className={contextInfo ? 'battle-heading dark' : 'battle-heading'}>
          Instructions
        </h2>
        <div className='flex battle-card-holder'>
          <div className='battle-card'>
            <h3
              className={
                contextInfo ? 'battle-card-title dark' : 'battle-card-title'
              }
            >
              Enter two Github User
            </h3>
            <div
              className={
                contextInfo
                  ? 'battle-icon-holder card-dark'
                  : 'battle-icon-holder'
              }
            >
              <AiOutlineUser className='battle-icon-svg fa-users' />
            </div>
          </div>
          <div className='battle-card'>
            <h3
              className={
                contextInfo ? 'battle-card-title dark' : 'battle-card-title'
              }
            >
              Battle
            </h3>
            <div
              className={
                contextInfo
                  ? 'battle-icon-holder card-dark'
                  : 'battle-icon-holder'
              }
            >
              <FaPlane className='battle-icon-svg fa-plane' />
            </div>
          </div>
          <div className='battle-card'>
            <h3
              className={
                contextInfo ? 'battle-card-title dark' : 'battle-card-title'
              }
            >
              See Winner
            </h3>
            <div
              className={
                contextInfo
                  ? 'battle-icon-holder card-dark'
                  : 'battle-icon-holder'
              }
            >
              <FaTrophy className='battle-icon-svg fa-trophy' />
            </div>
          </div>
        </div>
      </section>
      <section className='battle-game'>
        <h2 className={contextInfo ? 'battle-heading dark' : 'battle-heading'}>
          Players
        </h2>
        <div className='flex space-btw input-holder'>
          <div className='player playerOne'>
            <h3 className={contextInfo ? 'player-title dark' : 'player-title'}>
              Player One
            </h3>
            {!props.userData.dataOne ? (
              <form
                onSubmit={(event) =>
                  props.handleSubmit(event, 'inputOne', 'dataOne')
                }
              >
                <input
                  className='input'
                  onChange={props.handleChange}
                  type='text'
                  placeholder='Github UserName'
                  name='inputOne'
                  value={props.userData.inputOne}
                />
                <input
                  className={
                    props.userData.inputOne
                      ? 'submit-dark pointer'
                      : 'submit-light pointer'
                  }
                  type='submit'
                  value='SUBMIT'
                />
              </form>
            ) : (
              <div className='playerOne-found flex space-btw'>
                <div className='flex gap-2 align-center'>
                  <img
                    className='playerImg'
                    src={props.userData.dataOne.avatar_url}
                    alt={props.userData.dataOne.id}
                  />
                  <h3 className='found-player-name'>
                    {props.userData.dataOne.login}
                  </h3>
                </div>
                <span
                  onClick={() =>
                    props.handleRemovePlayer('inputOne', 'dataOne')
                  }
                  className='cross pointer'
                >
                  X
                </span>
              </div>
            )}
          </div>
          <div className='player playerTwo'>
            <h3 className={contextInfo ? 'player-title dark' : 'player-title'}>
              Player Two
            </h3>
            {!props.userData.dataTwo ? (
              <form
                onSubmit={(event) =>
                  props.handleSubmit(event, 'inputTwo', 'dataTwo')
                }
              >
                <input
                  className='input'
                  onChange={props.handleChange}
                  type='text'
                  placeholder='Github UserName'
                  name='inputTwo'
                  value={props.userData.inputTwo}
                />
                <input
                  className={
                    props.userData.inputTwo
                      ? 'submit-dark pointer'
                      : 'submit-light pointer'
                  }
                  type='submit'
                  value='SUBMIT'
                />
              </form>
            ) : (
              <div className='playerOne-found flex space-btw '>
                <div className='flex gap-2 align-center'>
                  <img
                    className='playerImg'
                    src={props.userData.dataTwo.avatar_url}
                    alt={props.userData.dataTwo.id}
                  />
                  <h3 className='found-player-name'>
                    {props.userData.dataTwo.login}
                  </h3>
                </div>
                <span
                  onClick={() =>
                    props.handleRemovePlayer('inputTwo', 'dataTwo')
                  }
                  className='cross pointer'
                >
                  X
                </span>
              </div>
            )}
          </div>
        </div>
      </section>
      <section>
        {!props.userData.dataOne || !props.userData.dataTwo ? (
          ''
        ) : (
          <Link to='/battle/result'>
            <button className='battle-fight submit-dark pointer'>BATTLE</button>
          </Link>
        )}
      </section>
    </div>
  );
}

export default Battle;
