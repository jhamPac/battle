import React          from 'react';
import { Link }       from 'react-router-dom';
import { getUserData } from '../utils/api';

export let Home = (props) => {

  

  return (
    <div className='home-container'>
      <h1>Battle...The coolest game!</h1>
      <Link className='button' to='/battle'>Battle</Link>
    </div>
  );
};
