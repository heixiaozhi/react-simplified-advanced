import { useCallback, useEffect, useRef, useState } from 'react'
import { fetchData } from '../api/fetchData'

export function InfiniteScroll() {
  const [url, setUrl] = useState(
    'http://127.0.0.1:3000/photos-short-list?_page=1&_limit=50'
  )
  const [imgList, setImgList] = useState([])
  //const urlRef = useRef(url)

  // 解决方法2
  // useRef 是持久化的：它保持了对值的引用，且不会因组件重新渲染而丢失或重置
  // useEffect(() => {
  //   urlRef.current = url
  // }, [url])

  // 解决方法1
  // 随着url更新，每次更新saveData函数，和视口观察者，这样就可避免使用旧值（闭包）

  const saveData = useCallback(async () => {
    if (url == null) return
    // const { data, nextUrl } = await fetchData(urlRef)
    const { data, nextUrl } = await fetchData(url)
    console.log(data, nextUrl)

    setImgList((current) => {
      return [...current, ...data]
    })
    setUrl(nextUrl)
  }, [url])

  useEffect(() => {
    // 视口观察者
    const observer = new IntersectionObserver(
      async (entries) => {
        // 是否被观察到
        if (entries[0].isIntersecting) {
          // 调用这个回调函数
          saveData()
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    )

    const loadingElement = document.querySelector('.loading')
    observer.observe(loadingElement)
    return () => {
      observer.disconnect()
    }
  }, [saveData])

  return (
    <>
      <div className='grid'>
        {imgList.map((item) => {
          return <img key={item.id} src={item.url} />
        })}

        {/* <div class='skeleton'>Loading...</div>
        <div class='skeleton'>Loading...</div>
        <div class='skeleton'>Loading...</div>
        <div class='skeleton'>Loading...</div>
        <div class='skeleton'>Loading...</div>
        <div class='skeleton'>Loading...</div> */}
        {/* <div className='skeleton'>Loading...</div> */}
      </div>
      <div className='loading'>...Loding</div>
    </>
  )
}
