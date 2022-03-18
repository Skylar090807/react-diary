import React from 'react'

const DiaryItem = ({ id, author, content, emotion, created_date }) => {
  return (
    <div className="DiaryItem">
      <span className="author">
        작성자: {author} | 오늘의 감정: {emotion}
      </span>
      <div className="date">{new Date(created_date).toLocaleString()}</div>
      <hr />
      <div className="content">{content}</div>
    </div>
  )
}

export default DiaryItem
