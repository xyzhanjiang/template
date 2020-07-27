import { useState, useEffect } from 'react'
import axios from 'axios'

import { pageSize } from '@/config'

/**
 * @param {Function} getData
 */
export function useData(getData) {

  const [error, setError] = useState(null)
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(true)
  const [isDelayElapsed, setDelayElapsed] = useState(false)

  useEffect(() => {
    setError(null)
    setData(null)
    setLoading(true)
    setDelayElapsed(false)

    getData().then((_data) => {
      setData(_data)
    }).catch((err) => setError(err)).finally(() => setLoading(false))

    // 如果毫秒以内数据就返回了，就不展示 Loading 了
    setTimeout(() => setDelayElapsed(true), 200)
  }, [])

  return {
    error,
    data,
    isLoading,
    isDelayElapsed
  }
}

/**
 * @param {Number} page
 */
export function usePosts(page = 1) {
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(true)
  const [isDelayElapsed, setDelayElapsed] = useState(false)

  useEffect(() => {
    setError(null)
    setData(null)
    setLoading(true)
    setDelayElapsed(false)

    axios.get(`/posts?_embed=comments&_expand=user&_page=${page}`)
      .then((res) => {
        setData({
          posts: res.data,
          totalCount: res.headers['x-total-count']
        })
      }).catch((err) => setError(err)).finally(() => setLoading(false))

    // 如果毫秒以内数据就返回了，就不展示 Loading 了
    setTimeout(() => setDelayElapsed(true), 200)
  }, [page])

  return {
    error,
    data,
    isLoading,
    isDelayElapsed
  }
}

/**
 * @param {String} id
 */
export function usePost(id) {
  return useData(() => {
    return Promise.all([
      axios.get(`/api/posts/${id}`),
      axios.get(`/api/posts/${id}/comments?_embed=replies`)
    ]).then(([res1, res2]) => {
      return ({
        post: res1.data,
        comments: res2.data
      })
    })
  })
}
