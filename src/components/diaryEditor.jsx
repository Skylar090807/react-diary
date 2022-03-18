import React, { useRef, useState } from 'react'

const DiaryEditor = ({ onCreate }) => {
  const [state, setState] = useState({
    author: '',
    content: '',
    emotion: 1,
  })

  //const authorInput: React.MutableRefObject<undefined>
  //useRef를 사용하여 React.MutableRefObject에 접근할 수 있게 되었다.
  const authorInput = useRef()
  const contentInput = useRef()

  const handleChangeState = (event) => {
    console.log('name : ', event.target.name)
    console.log('value : ', event.target.value)

    setState({
      ...state,
      [event.target.name]: event.target.value, //괄호 표기법
    })
  }

  const handleSubmit = () => {
    if (state.author.length < 1) {
      authorInput.current.focus()
      return
    }
    if (state.content.length < 5) {
      contentInput.current.focus()
      return
    }

    onCreate(state.author, state.content, state.emotion)
    alert('Successfully saved')
    setState({
      //저장 후 초기화
      author: '',
      content: '',
      emotion: 1,
    })
  }

  return (
    <div className="DiaryEditor">
      <h2>Today's Diary</h2>
      <div>
        {/* useRef()를 input 속성 ref로 매핑 */}
        <input placeholder="작성자" ref={authorInput} name="author" value={state.author} onChange={handleChangeState} />
      </div>
      <div>
        <textarea ref={contentInput} name="content" value={state.content} onChange={handleChangeState} />
      </div>
      <div>
        <span>Today's Emotion </span>
        <select name="emotion" value={state.emotion} onChange={handleChangeState}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>
      <div>
        <button onClick={handleSubmit}>Save</button>
      </div>
    </div>
  )
}

export default DiaryEditor
