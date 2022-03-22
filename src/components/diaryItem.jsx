import React, { Fragment, useEffect, useRef, useState } from 'react'

const DiaryItem = ({ id, author, content, emotion, created_date, onRemove, onEdit }) => {
  useEffect(() => {
    console.log(`${id}번째 아이템 렌더`)
  })

  //수정 중인지 수정 중이 아닌지 체크할 isEdit state 생성
  const [isEdit, setIsEdit] = useState(false)

  //toggleIsEdit이 호출되면 setIsEdit에서 인자로 받아온 not연산 !isEdit 반환
  const toggleIsEdit = () => setIsEdit(!isEdit)

  const [localContent, setLocalContent] = useState(content)

  const localContentInput = useRef()

  const handleRemove = () => {
    if (window.confirm(`확인을 누르면 ${id} 번째 일기가 삭제됩니다.`)) {
      onRemove(id)
    }
  }

  const handleQuitEdit = () => {
    setIsEdit(false)
    setLocalContent(content)
  }

  const handleEdit = () => {
    if (localContent.length < 5) {
      localContentInput.current.focus()
      return
    }

    if (window.confirm(`확인을 누르면 ${id}번째 일기가 수정됩니다.`)) {
      onEdit(id, localContent)
      toggleIsEdit()
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
            <textarea
              ref={localContentInput}
              value={localContent}
              onChange={(event) => setLocalContent(event.target.value)}
            />
          </Fragment>
        ) : (
          <Fragment>{content}</Fragment>
        )}
      </div>
      {isEdit ? (
        <Fragment>
          <button onClick={handleQuitEdit}>수정 취소</button>
          <button onClick={handleEdit}>수정 완료</button>
        </Fragment>
      ) : (
        <Fragment>
          <button onClick={handleRemove}>Remove</button>
          <button onClick={toggleIsEdit}>Modification</button>
        </Fragment>
      )}
    </div>
  )
}

export default React.memo(DiaryItem)
