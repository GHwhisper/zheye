import { createStore } from 'vuex'
import { getColumns, getColumnById } from '@/api/columns'
import { getPosts } from '@/api/posts'
import { login, getUserInfo } from '@/api/user'

export interface UserProps {
  isLogin: boolean
  nickName?: string
  _id?: string
  column?: string
  email?: string
}

export interface ImageProps {
  _id?: string
  url?: string
  createdAt?: string
}

export interface ColumnProps {
  _id: string
  title: string
  avatar?: ImageProps
  description: string
}

export interface PostProps {
  _id: string
  title: string
  excerpt?: string
  content?: string
  image?: ImageProps
  createdAt: string
  column: string
}

export interface GlobalDataProps {
  token: string
  loading: boolean
  columns: ColumnProps[]
  posts: PostProps[]
  user: UserProps
}

const store = createStore<GlobalDataProps>({
  state: {
    token: '',
    loading: false,
    columns: [],
    posts: [],
    user: { isLogin: false }
  },
  mutations: {
    // login (state) {
    //   state.user = { ...state.user, isLogin: true, name: 'Shuang' }
    // },
    createPost (state, newPost) {
      state.posts.push(newPost)
    },
    fetchColumns (state, rawData) {
      state.columns = rawData.data.list
    },
    fetchColumn (state, rawData) {
      state.columns = [rawData.data]
    },
    fetchPosts (state, rawData) {
      state.posts = rawData.data.list
    },
    setLoading (state, status) {
      state.loading = status
    },
    login (state, rawData) {
      state.token = rawData.data.token
    },
    fetchCurrentUser (state, rawData) {
      state.user = { isLogin: true, ...rawData.data }
    }
  },
  actions: {
    async fetchColumns ({ commit }) {
      const { data } = await getColumns()
      commit('fetchColumns', data)
    },
    async fetchColumn ({ commit }, cid) {
      const { data } = await getColumnById(cid)
      commit('fetchColumn', data)
    },
    async fetchPosts ({ commit }, cid) {
      const { data } = await getPosts(cid)
      commit('fetchPosts', data)
    },
    async login ({ commit }, payload) {
      const { data } = await login(payload)
      commit('login', data)
      return data
    },
    async fetchCurrentUser ({ commit }) {
      const { data } = await getUserInfo()
      commit('fetchCurrentUser', data)
      return data
    },
    loginAndFetch ({ dispatch }, loginData) {
      return dispatch('login', loginData).then(() => {
        return dispatch('fetchCurrentUser')
      })
    }
  },
  getters: {
    getColumnById: (state) => (id: string) => {
      return state.columns.find(c => c._id === id)
    },
    getPostByCid: (state) => (cid: string) => {
      return state.posts.filter(post => post.column === cid)
    }
  }
})

export default store
