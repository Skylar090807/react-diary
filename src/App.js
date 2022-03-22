import { createContext, useCallback, useEffect, useMemo, useReducer, useRef } from 'react'
import './App.css'
import DiaryEditor from './components/diaryEditor'
import DiaryList from './components/diaryList'

// https://jsonplaceholder.typicode.com/comments

//  fetch('https://jsonplaceholder.typicode.com/todos/1')
// .then(response => response.json())
// .then(json => console.log(json))

const reducer = (state, action) => {
  switch (action.type) {
    case 'INIT': {
      return action.data
    }

    case 'CREATE': {
      const created_date = new Date().getTime()
      const newItem = {
        ...action.data,
        created_date,
      }
      return [newItem, ...state]
    }
    case 'REMOVE': {
      return state.filter((item) => item.id !== action.targetId)
    }
    case 'EDIT': {
      return state.map((item) => (item.id === action.targetId ? { ...item, content: action.newContent } : item))
    }
    default:
      return state
  }
}

export const DiaryStateContext = createContext()

const App = () => {
  const [data, dispatch] = useReducer(reducer, [])

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
    dispatch({ type: 'INIT', data: initData })
  }

  useEffect(() => {
    getData()
  }, [])

  const onCreate = useCallback((author, content, emotion) => {
    dispatch({
      type: 'CREATE',
      data: {
        author,
        content,
        emotion,
        id: dataId.current,
      },
    })

    dataId.current += 1
  }, [])

  const onRemove = useCallback((targetId) => {
    dispatch({ type: 'REMOVE', targetId })
  }, [])

  const onEdit = useCallback((targetId, newContent) => {
    dispatch({
      type: 'EDIT',
      targetId,
      newContent,
    })
  }, [])

  //useMemo()
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
    <DiaryStateContext.Provider value={data}>
      <DiaryEditor onCreate={onCreate} />
      <div>전체 일기: {data.length} 개</div>
      <div>기분 좋은 날: {goodCount}</div>
      <div>기분 나쁜 날: {badCount}</div>
      <div>기분 좋은 날 비율: {goodRatio}</div>
      <DiaryList diaryList={data} onRemove={onRemove} onEdit={onEdit} />
    </DiaryStateContext.Provider>
  )
}

export default App
