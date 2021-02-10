import { makeObservable, observable, action, runInAction } from 'mobx'
import axios from 'axios'

class Post {
  @observable items = []
  @observable status = 'idle' // 'idle' | 'loading' | 'successed' | 'failed'
  @observable error = null
  @observable page = 1

  // 用来表示弹框选中的对应数据
  @observable selectedId = -1

  // 勾选状态保存在一个 Set 中
  // 当勾选某条数据的时候向其中添加该条数据的 id 值
  // 反选的时候则从数组中删除
  // 当数组的长度与当前条数相等的时候则表示已经全部选中
  @observable selectedIds = new Set()

  // 大于 0 表示有请求正在提交
  // 每增加一个请求数字加 1
  // 请求返回之后数字减 1
  // 不使用布尔值是因为如果先后有两个请求发出会出现逻辑错误
  @observable isSubmitting = 0

  constructor() {
    makeObservable(this)
  }

  @action postDeleted(id) {
    this.items = this.items.filter(post => post.id !== id)
  }

  @action setSelectedId(id) {
    this.selectedId = id
  }

  @action selectOne(id) {
    this.selectedIds.add(id)
  }

  @action unSelectOne(id) {
    this.selectedIds.delete(id)
  }

  @action selectAll() {
    this.items.map(item => this.selectedIds.add(item.id))
  }

  @action unSelectAll() {
    this.selectedIds.clear()
  }

  @action pageUpdated(page) {
    this.page = page
  }

  @action changeStatus(status) {
    this.status = status
  }

  @action setError() {
    this.error = error.message
  }

  @action endSubmit() {
    this.isSubmitting--
  }

  @action async fetchPosts(page) {
    this.isSubmitting++
    this.status = 'loading'
    try {
      const res = await axios.get(`/posts?_embed=comments&_expand=user&_page=${page}`)
      runInAction(() => {
        this.items = res.data
        this.status = 'successed'
      })
    } catch (err) {
      runInAction(() => {
        this.status = 'failed'
      })
    }
    this.endSubmit()
  }

  @action async addPost(item) {
    this.isSubmitting++
    try {
      const res = await axios.post('/posts', item)
      runInAction(() => {
        this.items.unshift(res.data)
      })
    } catch (err) {
      alert(err)
    }
    this.endSubmit()
  }

  // 改
  @action async editPost(item) {
    this.isSubmitting++
    try {
      const res = await axios.patch(`/posts/${item.id}`, item)
      runInAction(() => {
        const { id, title, body } = res.data
        const item = this.items.find(post => post.id === id)
        if (item) {
          item.title = title
          item.body = body
        }
      })
    } catch (err) {
      alert(err)
    }
    this.endSubmit()
  }

  // 删
  @action async delPost(id) {
    this.isSubmitting++
    try {
      const res = await axios.delete(`/posts/${id}`)
    } catch (err) {
      alert(err)
    }
    this.endSubmit()
  }
}

export const postStore = new Post()
