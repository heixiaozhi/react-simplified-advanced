import {
  addDays,
  addMonths,
  addWeeks,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  isSunday,
  isToday,
  startOfMonth,
  startOfWeek,
} from 'date-fns'
import { useState } from 'react'

export function DatePicker2({ value, onChange }) {
  const [isOpen, setIsOpen] = useState()
  return (
    <>
      <div className='date-picker-container'>
        <button
          className='date-picker-button'
          onClick={() => setIsOpen((d) => !d)}
        >
          {value == null ? 'select day' : format(value, 'yyyy-MM-dd')}
        </button>
        {isOpen && <DatePickerModal value={value} onChange={onChange} />}
      </div>
    </>
  )
}

function DatePickerModal({ value, onChange }) {
  // useState 只有 set 和 组件创建的时候才会重新计算值
  const [visibleDate, setVisibleDate] = useState(value || new Date())

  function showPreviousMonth() {
    setVisibleDate((current) => {
      return addMonths(current, -1)
    })
  }

  function showNextMonth() {
    setVisibleDate((current) => {
      return addMonths(current, 1)
    })
  }

  let obj
  // 如果这个月的1号是星期天的话，就把1号所在的这一周显示出来
  // 按照周一到 周日排列
  if (isSunday(startOfMonth(visibleDate))) {
    obj = {
      start: addDays(addWeeks(startOfMonth(visibleDate), -1), 1),
      end: addDays(endOfWeek(endOfMonth(visibleDate)), 1),
    }
  } else {
    obj = {
      start: addDays(startOfWeek(startOfMonth(visibleDate)), 1),
      end: addDays(endOfWeek(endOfMonth(visibleDate)), 8),
    }
  }

  const dates = eachDayOfInterval(obj)

  return (
    <>
      <div className='date-picker'>
        <div className='date-picker-header'>
          <button
            className='prev-month-button month-button'
            onClick={showPreviousMonth}
          >
            &larr;
          </button>
          <div className='current-month'>{format(visibleDate, 'yy-MM')}</div>
          <button
            className='next-month-button month-button'
            onClick={showNextMonth}
          >
            &rarr;
          </button>
        </div>
        <div className='date-picker-grid-header date-picker-grid'>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
          <div>Sun</div>
        </div>
        <div className='date-picker-grid-dates date-picker-grid'>
          {dates.map((date) => {
            return (
              <button
                onClick={() => onChange(date)}
                key={date.toDateString()}
                className={`date ${!isSameMonth(visibleDate, date) ? 'date-picker-other-month-date' : ''} 
                ${isSameDay(value, date) ? 'selected' : ''}
                ${isToday(date) ? 'today' : ''}`}
              >
                {date.getDate()}
              </button>
            )
          })}

          {/* <button className='date selected'>26</button>
          <button className='date today'>29</button> */}
        </div>
      </div>
    </>
  )
}
