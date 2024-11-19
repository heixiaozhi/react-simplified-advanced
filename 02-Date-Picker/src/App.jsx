import { useState } from 'react'
import { DatePicker } from './DatePicker'
import './styles.css'
import { DatePicker2 } from './DatePicker2'

function App() {
  const [value, setValue] = useState()
  return (
    <>
      {/* <DatePicker value={value} onChange={setValue} /> */}
      <DatePicker2 value={value} onChange={setValue} />
    </>
  )
}

export default App
