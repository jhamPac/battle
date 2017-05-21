import React          from 'react';
import { Link }       from 'react-router-dom';
import { battle } from '../utils/api';

export let Home = (props) => {

  return (
    <div className='home-container'>
      <h1>Battle...The coolest game!</h1>
      <Link className='button' to='/battle'>Battle</Link>
    </div>
  );
};
