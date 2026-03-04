import { useState } from "react"

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hide = { display: visible ? 'none' : '' }
  const show = { display: visible ? '' : 'none' }

  return (<>
    <div style={hide}>
      <button onClick={() => setVisible(!visible)}>{props.btnLabel}</button>
    </div>
    <div style={show}>
      {props.children}
      <button onClick={() => setVisible(!visible)}>cancel</button>
    </div>
    </>
  )
}


export default Togglable