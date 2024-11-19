import { useState } from 'react'
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  isToday,
  startOfMonth,
  startOfWeek,
} from 'date-fns'

export function DatePicker({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <div className='date-picker-container'>
        <button
          className='date-picker-button'
          onClick={() => setIsOpen((d) => !d)}
        >
          {value == null ? 'Select a Date' : format(value, 'MMM do, yyyy')}
        </button>
        {isOpen && <DatePickerModal value={value} onChange={onChange} />}
      </div>
    </>
  )
}

function DatePickerModal({ value, onChange }) {
  // useState 只有被 set的时候才会重新计算或者组件创建的时候
  const [visibleMonth, setvisibleMonth] = useState(value || new Date())

  function showPreviousMonth() {
    setvisibleMonth((currentMonth) => {
      return addMonths(currentMonth, -1)
    })
  }

  function showNextMonth() {
    setvisibleMonth((currentMonth) => {
      return addMonths(currentMonth, 1)
    })
  }
  // addMonths() 给当前时间添加月份
  // eachDayOfInterval 返回开始时间到结束时间的所有天数[]
  // startOfMonth 返回当前日期这个月的开始时间
  // startOfWeek 返回当前时间的开始的周的时间
  // isSameMonth 是否同一个月
  // isSameDay 是否同一天
  // isToday 是否是今天
  const visibleDates = eachDayOfInterval({
    start: startOfWeek(startOfMonth(visibleMonth)),
    end: endOfWeek(endOfMonth(visibleMonth)),
  })

  return (
    <div className='date-picker'>
      <div className='date-picker-header'>
        <button
          className='prev-month-button month-button'
          onClick={showPreviousMonth}
        >
          &larr;
        </button>
        <div className='current-month'>
          {format(visibleMonth, 'MMMM - yyyy')}
        </div>
        <button
          className='next-month-button month-button'
          onClick={showNextMonth}
        >
          &rarr;
        </button>
      </div>
      <div className='date-picker-grid-header date-picker-grid'>
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>
      <div className='date-picker-grid-dates date-picker-grid'>
        {visibleDates.map((date) => {
          return (
            <button
              onClick={() => onChange(date)}
              className={`date ${!isSameMonth(date, visibleMonth) && 'date-picker-other-month-date'} ${isSameDay(date, value) && 'selected'}
              ${isToday(date) && 'today'}`}
              key={date.toDateString()}
            >
              {date.getDate()}
            </button>
          )
        })}
      </div>
    </div>
  )
}
