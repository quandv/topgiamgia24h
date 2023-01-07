import Api from '@/services/Api'

export default {
  fetchPosts (oid, s, page) {
    return Api().get('/api/posts', { params: { oid: oid, s: s, page: page } })
  },
  fetchPostsHot (oid, s, page) {
    return Api().get('/api/posts', { params: { type: 'hot', oid: oid, s: s, page: page } })
  },
  fetchPostsCoupon (oid, s, page) {
    return Api().get('/api/posts', { params: { type: 'coupon', oid: oid, s: s, page: page } })
  }
}
