import React, { useEffect, useState } from 'react'

const UnmountTest = () => {
  useEffect(() => {
    console.log('Mount!')

    return () => {
      //Unmount 시점에 실행된다.
      console.log('Unmount!')
    }
  }, [])

  return <div>Unmount Testing Component</div>
}

const Lifecycle = () => {
  const [isVisible, setIsVisible] = useState(false)

  const toggle = () => {
    setIsVisible(!isVisible)
  }

  return (
    <div style={{ padding: '20px' }}>
      <button onClick={toggle}>On/Off</button>

      {/* 단락회로 평가로 isVisible이 true이면 <UnmountTest />가 mount되어 렌더되고, flase이면 unmount로 렌더되지 않는다. */}
      {isVisible && <UnmountTest />}
    </div>
  )
}

export default Lifecycle
