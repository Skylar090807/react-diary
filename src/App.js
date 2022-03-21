import { Fragment, useRef, useState } from 'react'
import './App.css'
import DiaryEditor from './components/diaryEditor'
import DiaryList from './components/diaryList'
import Lifecycle from './components/Lifecycle'

const App = () => {
  const [data, setData] = useState([])

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

  const onRemove = (targetId) => {
    console.log(`${targetId}가 삭제되었습니다.`)
    const newDiaryList = data.filter((item) => item.id !== targetId)
    console.log(newDiaryList)
    setData(newDiaryList)
  }

  const onEdit = (targetId, newContent) => {
    setData(data.map((item) => (item.id === targetId ? { ...item, content: newContent } : item)))
  }

  return (
    <Fragment>
      <Lifecycle />
      <DiaryEditor onCreate={onCreate} />
      <DiaryList diaryList={data} onRemove={onRemove} onEdit={onEdit} />
    </Fragment>
  )
}

export default App
