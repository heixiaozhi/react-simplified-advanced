import { parseLinkHeader } from '../utils/parseLinkHeader'

export async function fetchData(url) {
  const response = await fetch(url)
  const data = await response.json()

  // 下一页链接
  const linkHeader = response.headers.get('Link')
  const links = parseLinkHeader(linkHeader)

  // 小心没有数据为null
  url = links.next || null
  return {
    data,
    nextUrl: url,
  }
}
