import React from 'react'

const skills = ({skill}) => {
  return (
    <div>
      <div>skills</div>
      <ul style={{listStyleType: 'none',color: 'blue',fontSize: '60px'}}>
        {skill.map((s, index) => (
          <li key={index}>{s}</li>
        ))}
      </ul>
    </div>
  );
}

export default skills;