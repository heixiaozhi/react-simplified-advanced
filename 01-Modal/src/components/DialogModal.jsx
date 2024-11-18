import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

export function DialogModal({ show, onClose, children }) {
  // dialog el元素 esc是可以关闭的，但是不能改变我们的状态
  const dialogRef = useRef(null)
  useEffect(() => {
    const dialog = dialogRef.current
    // 这个可以不用写，因为是先加载组件，再执行的useEffect钩子
    // if (dialog === null) return;
    if (show) {
      dialog.showModal()
    } else {
      dialog.close()
    }
  }, [show])

  // props onClose 是个匿名函数，父组件重新渲染时就是它每次都会不一样，所以会触发
  // 如果完全不传递依赖数组，则 Effect 会在组件的 每次单独渲染（和重新渲染）之后 运行。
  // = 无[]的useEffect
  useEffect(() => {
    const dialog = dialogRef.current
    // if (dialog === null) return;
    // dialog el有一个close事件，就是esc的时候触发
    dialog.addEventListener('close', onClose)
    return () => {
      dialog.removeEventListener('close', onClose)
    }
  }, []) // 应该使用[]会更好，[close]不然每次父组件内容不一样的时候，都会触发添加多次

  return createPortal(
    <dialog ref={dialogRef}>{children}</dialog>,
    document.querySelector('.modal-container')
  )
}
