import { Fragment, useRef, useState } from 'react'
import './App.css'
import DiaryEditor from './components/diaryEditor'
import DiaryList from './components/diaryList'

function App() {
  const [data, setData] = useState()

  const dataId = useRef(0)

  const onCreate = (author, content, emotion) => {
    const created_date = new Date().getTime()
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current,
    }
    dataId.current += 1
    setData([newItem, ...data])
  }

  return (
    <Fragment>
      <DiaryEditor onCreate={onCreate} />
      <DiaryList diaryList={data} />
    </Fragment>
  )
}

export default App
