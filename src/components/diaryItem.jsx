import React from 'react'

const DiaryItem = ({ id, author, content, emotion, created_date, onDelete }) => {
  return (
    <div className="DiaryItem">
      <span className="author">
        작성자: {author} | 오늘의 감정: {emotion}
      </span>
      <div className="date">{new Date(created_date).toLocaleString()}</div>
      <hr />
      <div className="content">{content}</div>
      <button
        onClick={() => {
          if (window.confirm(`확인을 누르면 ${id} 번째 일기가 삭제됩니다.`)) {
            onDelete(id)
          }
        }}
      >
        Delete
      </button>
    </div>
  )
}

export default DiaryItem
