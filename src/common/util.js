import { flow } from 'lodash'
import dayjs from 'dayjs'
import marked from 'marked'
import DOMPurify from 'dompurify'

// 格式化时间 eg. Jun 07, 2019
export function formatDate(date) {
  return dayjs(date).format('MMM DD, YYYY')
}

// 将 markdown 格式到文本转换为 HTML
// 同时去掉不安全到内容
export const formatContent = flow(marked, DOMPurify.sanitize)
