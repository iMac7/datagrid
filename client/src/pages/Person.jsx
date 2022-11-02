import React from 'react'

function Person({params}) {
  return (
    <div>
      {console.log(params)}
        <h3>NAME:</h3>
        <p>{params.row.NAME}</p>
        <br />
        <h3>INTERESTS:</h3>
        {
            params.row?.INTERESTS.map((interest, index) => <p key={index}> {interest} </p> )
        }

    </div>
  )
}

export default Person