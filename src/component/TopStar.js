import React, { useContext } from 'react';
import { useState, useEffect } from 'react';
import { FaUserAlt } from 'react-icons/fa';
import { GoIssueOpened } from 'react-icons/go';
import { AiFillStar, AiOutlineFork } from 'react-icons/ai';

import MyContext from '../contextAPI/context';

function TopStar() {
  const [allUsers, setAllUsers] = useState([]);
  const [tag, setTag] = useState('All');
  const [tagArr, setTagArr] = useState([
    'All',
    'Javascript',
    'CSS',
    'Python',
    'Ruby',
    'Java',
  ]);

  const controller = new AbortController();

  useEffect(() => {
    fetch(
      `https://api.github.com/search/repositories?q=stars:%3E1+language:${tag}&sort=stars&order=desc&type=Repositories`,
      {
        method: 'get',
        signal: controller.signal,
      }
    )
      .then((res) => res.json())
      .then((data) => setAllUsers(data.items));

    return () => {
      controller.abort();
    };
  }, [tag]);

  const handleChangeTag = (val) => {
    setTag(val);
  };

  if (!allUsers.length) return <Loading />;

  return (
    <div>
      <ul className='tag-holder'>
        {tagArr.map((lang) => {
          return (
            <CreateTag
              handleChangeTag={handleChangeTag}
              key={lang}
              val={lang}
              tag={tag}
            />
          );
        })}
      </ul>
      <ul className='card-holder'>
        {allUsers.map((singleCard, i) => {
          return <Card key={i} info={singleCard} i={i} />;
        })}
      </ul>
    </div>
  );
}

export default TopStar;

function Card(props) {
  const contextInfo = useContext(MyContext);

  return (
    <li className={contextInfo ? 'card card-dark' : 'card'}>
      <span className={contextInfo ? 'rank dark' : 'rank'}>#{props.i + 1}</span>
      <img
        src={props.info.owner.avatar_url}
        className='card-img'
        alt={props.id}
      />
      <a href={props.info.html_url} className='card-github-link'>
        {props.info.name}
      </a>
      <h2 className={contextInfo ? 'card-username dark' : 'card-username'}>
        <FaUserAlt /> {props.info.name}
      </h2>
      <h2 className={contextInfo ? 'card-stars dark' : 'card-stars'}>
        <AiFillStar /> {props.info.stargazers_count} stars
      </h2>
      <h2 className={contextInfo ? 'card-fork dark' : 'card-fork'}>
        <AiOutlineFork /> {props.info.forks} forks
      </h2>
      <h2 className={contextInfo ? 'card-issue dark' : 'card-issue'}>
        <GoIssueOpened />
        {props.info.open_issues_count} open issue
      </h2>
    </li>
  );
}

function CreateTag(props) {
  return (
    <li>
      <button
        onClick={() => props.handleChangeTag(props.val)}
        className={
          props.tag === props.val ? 'active tag-btn pointer' : 'tag-btn pointer'
        }
      >
        {props.val}
      </button>
    </li>
  );
}

function Loading() {
  const contextInfo = useContext(MyContext);
  return (
    <h1 className={contextInfo ? 'loading-h1 dark' : 'loading-h1'}>
      Loading...
    </h1>
  );
}
