import React from 'react'
import DiaryItem from './diaryItem'

const DiaryList = ({ diaryList }) => {
  console.log(diaryList)

  return (
    <div className="DiaryList">
      <h2>Diary List</h2>
      <h4>{diaryList.length}개의 일기가 있습니다.</h4>
      <div>
        {diaryList.map((item) => (
          <DiaryItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  )
}

export default DiaryList
