import React, { useState } from 'react'

const DiaryEditor = () => {
  const [state, setState] = useState({
    author: '',
    content: '',
    emotion: '😭',
  })

  const handleChangeState = (event) => {
    console.log('name : ', event.target.name)
    console.log('value : ', event.target.value)

    setState({
      ...state,
      [event.target.name]: event.target.value, //괄호 표기법
    })
  }

  const handleSubmit = () => {
    console.log(state)
    alert('Successfully saved')
  }

  return (
    <div className="DiaryEditor">
      <h2>Today's Diary</h2>
      <div>
        <input name="author" value={state.author} onChange={handleChangeState} />
      </div>
      <div>
        <textarea name="content" value={state.content} onChange={handleChangeState} />
      </div>
      <div>
        <span>Today's Emotion </span>
        <select name="emotion" value={state.emotion} onChange={handleChangeState}>
          <option value={1}>😭</option>
          <option value={2}>😥</option>
          <option value={3}>😐</option>
          <option value={4}>😀</option>
          <option value={5}>😆</option>
        </select>
      </div>
      <div>
        <button onClick={handleSubmit}>Save</button>
      </div>
    </div>
  )
}

export default DiaryEditor
