import React, { useEffect, useState } from 'react'

const Lifecycle = () => {
  const [count, setCount] = useState(0)
  const [text, setText] = useState('')

  useEffect(() => {
    console.log('Mount!')
  }, [])

  useEffect(() => {
    console.log('Update!')
  })

  useEffect(() => {
    console.log(`count 변경! : ${count}`)
  }, [count])

  useEffect(() => {
    console.log(`text 변경! : ${text}`)
  }, [text])

  useEffect(() => {
    console.log(`count 변경! : ${count}`)
    if (count > 5) {
      alert('count가 5 이상입니다. 1로 초기화합니다.')
      setCount(1)
    }
  }, [count])

  const CountHandler = () => {
    setCount(count + 1)
  }

  const TextHandler = (e) => {
    setText(e.target.value)
  }

  return (
    <div style={{ padding: '20px' }}>
      <div>
        {count}
        <button onClick={CountHandler}>+ </button>
      </div>
      <div>
        <input value={text} onChange={TextHandler} />
      </div>
    </div>
  )
}

export default Lifecycle
