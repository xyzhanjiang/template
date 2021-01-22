import { flow } from 'lodash'
import marked from 'marked'
import DOMPurify from 'dompurify'

// 将 markdown 格式到文本转换为 HTML
// 同时去掉不安全到内容
export const formatContent = flow(marked, DOMPurify.sanitize)
