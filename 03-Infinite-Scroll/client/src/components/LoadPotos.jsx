import { useCallback, useEffect, useState, useRef } from 'react'
import { parseLinkHeader } from '../utils/parseLinkHeader'

const LIMIT = 50

export function LoadPotos() {
  const [photos, setphotos] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  // 持久化存储url，不会被闭包影响
  const nextURL = useRef()

  // 浏览器一次渲染多张图片，会导致图片出现html框架，但是图片未显示的情况（白屏）
  // 解决方法：骨架图、图片懒加载、（批量加载/分页加载）
  // 骨架图就是用相同大小的盒子先做完数据加载前展示，数据加载后被替换
  // {overwrite = false} = {} 这里是如果没传参数就去{}解构，没有就false
  // 传参解构，没这个属性就false
  async function fetchImages(url, { overwrite = false } = {}) {
    // 加载时设置为true
    setIsLoading(true)
    try {
      // new Promise(function(resolve, reject)) 订阅者，消费者由.then或await
      // 创建一个两秒的时间，展示骨架图
      await new Promise((resolve, reject) => {
        setTimeout(() => resolve(), 2000)
      })
      const res = await fetch(url)
      // 获取下一个url
      nextURL.current = parseLinkHeader(res.headers.get('Link')).next
      const currentPhotos = await res.json()
      if (overwrite) {
        setphotos(currentPhotos)
      } else {
        setphotos((prePhotots) => {
          return [...prePhotots, ...currentPhotos]
        })
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const imageRef = useCallback((image) => {
    // 当没有最后的图片后不需要观察了
    if (image == null || nextURL.current == null) return
    //添加视口观察者
    const observer = new IntersectionObserver((entries) => {
      // entries 被观察者数组
      if (entries[0].isIntersecting) {
        fetchImages(nextURL.current)
        // 观察完后停止观察
        observer.unobserve(image)
      }
    })
    // 开启观察
    observer.observe(image)
  }, [])

  useEffect(() => {
    //'http://127.0.0.1:3000/photos-short-list?_page=1&_limit=50'
    fetchImages(
      `http://127.0.0.1:3000/photos-short-list?_page=1&_limit=${LIMIT}`,
      {
        overwrite: true,
      }
    )
  }, [])

  return (
    <>
      <div className='grid'>
        {photos.map((item, index) => {
          return (
            <img
              key={item.id}
              src={item.url}
              // 当是最后一张照片时观察获取新的图片
              ref={index === photos.length - 1 ? imageRef : undefined}
            />
          )
        })}
        {/* 使用Array.from创建一个数组 */}
        {isLoading &&
          Array.from({ length: LIMIT }, (_, index) => {
            return index
          }).map((item) => {
            return (
              <div key={item} className='skeleton'>
                Loading...
              </div>
            )
          })}
      </div>
    </>
  )
}
