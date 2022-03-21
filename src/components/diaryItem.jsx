import React, { Fragment, useState } from 'react'

const DiaryItem = ({ id, author, content, emotion, created_date, onRemove }) => {
  //수정 중인지 수정 중이 아닌지 체크할 isEdit state 생성
  const [isEdit, setIsEdit] = useState(false)

  //toggleIsEdit이 호출되면 setIsEdit에서 인자로 받아온 not연산 !isEdit 반환
  const toggleIsEdit = () => setIsEdit(!isEdit)

  const handleRemove = () => {
    if (window.confirm(`확인을 누르면 ${id} 번째 일기가 삭제됩니다.`)) {
      onRemove(id)
    }
  }

  return (
    <div className="DiaryItem">
      <span className="author">
        작성자: {author} | 오늘의 감정: {emotion}
      </span>
      <div className="date">{new Date(created_date).toLocaleString()}</div>
      <hr />
      <div className="content">
        {isEdit ? (
          <Fragment>
            <textarea />
          </Fragment>
        ) : (
          <Fragment>{content}</Fragment>
        )}
      </div>
      <button onClick={handleRemove}>Remove</button>
      <button onClick={toggleIsEdit}>Modification</button>
    </div>
  )
}

export default DiaryItem
