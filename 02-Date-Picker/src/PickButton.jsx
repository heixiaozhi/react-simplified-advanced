export function PickButton({ value }) {
  return (
    <>
      {/* <button className='date date-picker-other-month-date'>28</button>
      <button className='date selected'>26</button>
      <button className='date'>1</button>
      <button className='date today'>29</button> */}
      <button className='date'>{value}</button>
    </>
  )
}
