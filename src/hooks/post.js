import { useQuery } from 'react-query'
import axios from 'axios'

const getPostById = async (_, postId) => {
  const { data } = await axios.get(`/posts/${postId}?_embed=comments&_expand=user`)
  return data
}

export default function usePost(postId) {
  return useQuery(['post', postId], getPostById)
}
