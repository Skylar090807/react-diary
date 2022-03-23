import React, { useContext } from 'react'
import { DiaryStateContext } from '../App'
import DiaryItem from './diaryItem'

// App.js에서 prop으로 받아 온 diaryList는 data state의 값이다.
// createContext로 data state를 넘겨 받았으므로 더이상 props로 받아 올 필요 없다.

const DiaryList = ({}) => {
  const diaryList = useContext(DiaryStateContext)

  return (
    <div className="DiaryList">
      <h2>Diary List</h2>
      <h4>{diaryList.length} 개의 일기가 있습니다.</h4>
      <div>
        {diaryList.map((item, index) => (
          <DiaryItem key={index} {...item} />
        ))}
      </div>
    </div>
  )
}

DiaryList.defaultProps = {
  diaryList: [],
}

export default DiaryList
