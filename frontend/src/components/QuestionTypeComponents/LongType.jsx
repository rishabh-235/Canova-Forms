import React from 'react'

function LongType() {
  return (
    <textarea className='long-type-input' placeholder='Write your answer here...' minLength={10} />
  )
}

export default LongType