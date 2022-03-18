import { Fragment } from 'react'
import './App.css'
import DiaryEditor from './components/diaryEditor'
import DiaryList from './components/diaryList'

const dummyList = [
  {
    id: 1,
    author: 'skylar',
    content: '오늘의 일기는...',
    emotion: '😁',
    // new 키워드 생성자로 Date()를 생성해 현재 시간 받아 옴.
    //getTime() 메서드는 시간을 밀리세컨드로 받아오고 number로 반환.
    created_date: new Date().getTime(),
  },
  {
    id: 2,
    author: 'skylar',
    content: 'lorem inpsum',
    emotion: '😁',
    created_date: new Date().getTime(),
  },
  {
    id: 3,
    author: 'alexis',
    content: '오늘의 일기는...',
    emotion: '😁',
    created_date: new Date().getTime(),
  },
]

function App() {
  return (
    <Fragment>
      <DiaryEditor />
      <DiaryList diaryList={dummyList} />
    </Fragment>
  )
}

export default App
