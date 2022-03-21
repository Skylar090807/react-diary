import { Fragment, useEffect, useRef, useState } from 'react'
import './App.css'
import DiaryEditor from './components/diaryEditor'
import DiaryList from './components/diaryList'

// https://jsonplaceholder.typicode.com/comments

//  fetch('https://jsonplaceholder.typicode.com/todos/1')
// .then(response => response.json())
// .then(json => console.log(json))

const App = () => {
  const [data, setData] = useState([])

  const dataId = useRef(0)

  const getData = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/comments').then((res) => res.json())
    console.log(res)

    //data를 0~19까지 20개 가져온다.
    const initData = res.slice(0, 20).map((item) => {
      return {
        author: item.email,
        content: item.body,
        emotion: '😆',
        // emotion: Math.floor(Math.random()*5)+1
        // Math.floor 소수점 이하 버림
        // Math.random()*5 0~4까지 랜덤 숫자 발생
        // (Math.random()*5)+1 1~5까지 랜덤 숫자 발생
        created_date: new Date().getTime(),
        id: dataId.current++,
      }
    })
    setData(initData)
  }

  useEffect(() => {
    getData()
  }, [])

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
      <DiaryEditor onCreate={onCreate} />
      <DiaryList diaryList={data} onRemove={onRemove} onEdit={onEdit} />
    </Fragment>
  )
}

export default App
