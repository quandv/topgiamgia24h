import Api from '@/services/Api'

export default {
  fetchShops () {
    return Api().get('/api/shops')
  }
}
