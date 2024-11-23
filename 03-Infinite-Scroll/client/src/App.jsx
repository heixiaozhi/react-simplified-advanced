import { useState } from 'react'
import { InfiniteScroll } from './components/InfiniteScroll'
import { LoadPotos } from './components/LoadPotos'
function App() {
  //const [value, setValue] = useState(0)

  return (
    <>
      <h1>My react app</h1>
      <LoadPotos />
      {/* self code */}
      {/* <InfiniteScroll /> */}
    </>
  )
}

export default App
