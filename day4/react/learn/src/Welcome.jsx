import React from 'react'

const Welcome = (props) => {
  return (
    <div>
      <h1>Welcome {props.name}</h1>
      <h1>this page is: {props.page}</h1>
    </div>
  )
}

export default Welcome