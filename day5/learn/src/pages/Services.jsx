import React, { useContext } from 'react';
import { InfoContext } from '../hooks/InfoContext.jsx';
import { Link } from 'react-router-dom';

const Services = () => {
  const { info } = useContext(InfoContext);
  return (
    <div>
      <h1>Services Page</h1>
      <p>Name: {info.name}</p>
      <p>Age: {info.age}</p>
      <p>Department: {info.dept}</p>
      <br />
      <Link to="/">Go to Home</Link>
    </div>
  );
};

export default Services;