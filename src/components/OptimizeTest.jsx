import React, { useEffect, useState } from 'react'

const CounterA = React.memo(({ count }) => {
  useEffect(() => {
    console.log(`CounterA updated count: ${count}`)
  })
  return <div>{count}</div>
})

const CounterB = React.memo(({ obj }) => {
  useEffect(() => {
    console.log(`CounterB updated obj: ${obj}`)
  })
  return <div>{obj.count}</div>
})

const OptimizeTest = () => {
  const [count, setCount] = useState(1)
  const [obj, setObj] = useState({
    count: 1,
  })

  return (
    <div style={{ padding: '50px' }}>
      <div>
        <h2>counter A</h2>
        <CounterA count={count} />
        <button onClick={() => setCount(count)}>button A</button>
      </div>
      <div>
        <h2>counter B</h2>
        <CounterB obj={obj} />
        <button onClick={() => setObj({ count: obj.count })}>button B</button>
      </div>
    </div>
  )
}

export default OptimizeTest
