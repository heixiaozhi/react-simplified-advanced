import { useEffect } from 'react'
import { createPortal } from 'react-dom'

export function CustomModal({ show, onClose, children }) {
  // 当组件被创建时添加事件
  // css display:none 只是将元素隐藏
  // react 只有条件渲染 才能卸载组件
  useEffect(() => {
    const handleClose = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    document.addEventListener('keydown', handleClose)
    return () => {
      document.removeEventListener('keydown', handleClose)
    }
  }, [])

  return createPortal(
    <div className={`modal-overlay ${show ? 'show' : ''}`}>
      <div className='modal'>{children}</div>
    </div>,
    document.querySelector('.modal-container')
  )
}
