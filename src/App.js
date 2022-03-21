import { Fragment, useEffect, useMemo, useRef, useState } from 'react'
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

  //emotion을 emoji 문자열 타입으로 넣어서 아래 getDiaryAnalysis 함수는 제대로 작동하지 않는다.
  const getDiaryAnalysis = useMemo(() => {
    if (data.length === 0) {
      return { goodcount: 0, badCount: 0, goodRatio: 0 }
    }
    console.log('일기 분석 시작')

    const goodCount = data.filter((it) => it.emotion >= 3).length
    const badCount = data.length - goodCount
    const goodRatio = (goodCount / data.length) * 100.0
    return { goodCount, badCount, goodRatio }
  }, [data.length])

  //useMemo를 사용하게 되면 getDiaryAnalysis는 함수가 아니라 값을 반환하게 된다.
  //따라서 getDiaryAnalysis()로 호출하면 function이 아니라는 에러가 발생한다.
  const { goodCount, badCount, goodRatio } = getDiaryAnalysis

  return (
    <Fragment>
      <DiaryEditor onCreate={onCreate} />
      <div>전체 일기: {data.length} 개</div>
      <div>기분 좋은 날: {goodCount}</div>
      <div>기분 나쁜 날: {badCount}</div>
      <div>기분 좋은 날 비율: {goodRatio}</div>
      <DiaryList diaryList={data} onRemove={onRemove} onEdit={onEdit} />
    </Fragment>
  )
}

export default App
