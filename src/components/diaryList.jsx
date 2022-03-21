import React from 'react'
import DiaryItem from './diaryItem'

const DiaryList = ({ diaryList, onRemove, onEdit }) => {
  console.log(diaryList)

  return (
    <div className="DiaryList">
      <h2>Diary List</h2>
      <h4>{diaryList.length} 개의 일기가 있습니다.</h4>
      <div>
        {diaryList.map((item, index) => (
          <DiaryItem key={index} {...item} onRemove={onRemove} onEdit={onEdit} />
        ))}
      </div>
    </div>
  )
}

DiaryList.defaultProps = {
  diaryList: [],
}

export default DiaryList
