import Api from '@/services/Api'

export default {
  fetchProducts (oid, s, page) {
    return Api().get('/api/products', { params: { oid: oid, s: s, page: page } })
  }
}
