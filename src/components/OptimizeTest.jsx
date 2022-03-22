import React, { useEffect, useState } from 'react'

const Textview = ({ text }) => {
  useEffect(() => {
    console.log(`update text: ${text}`)
  })
  return <div>{text}</div>
}

const Countview = ({ count }) => {
  useEffect(() => {
    console.log(`update count: ${count}`)
  })
  return <div>{count}</div>
}

const OptimizeTest = () => {
  const [count, setCount] = useState(1)
  const [text, setText] = useState('')

  return (
    <div style={{ padding: '50px' }}>
      <div>
        <h2>count</h2>
        <Countview count={count} />
        <button onClick={() => setCount(count + 1)}>+</button>
      </div>
      <div>
        <h2>text</h2>
        <Textview text={text} />
        <input type={text} onChange={(event) => setText(event.target.value)} />
      </div>
    </div>
  )
}

export default OptimizeTest
