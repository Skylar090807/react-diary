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
    setData([newItem]) // 스프레드 연산자 사용 시 react-dom.development.js:4091 Uncaught TypeError: data is not iterable
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
      <DiaryEditor onCreate={onCreate} />
      <DiaryList diaryList={data} onRemove={onRemove} onEdit={onEdit} />
    </Fragment>
  )
}

export default App
