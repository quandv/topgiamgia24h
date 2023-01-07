<template>
  <div id="products" class="row" v-if="products.length > 0">
    <div class="col-md-12">
      <h3><i class="fa fa-star-o"></i> Sản phẩm khuyến mại</h3>
    </div>
    <template v-for="(product, index) in products">
      <div class="col-md-3" v-bind:key="product.product_id+'-abc'">
        <div class="post">
          <a class="post-img" v-bind:href="product.tracking_link"><img v-bind:src="product.product_picture" v-bind:alt="product.product_name"></a>
          <div class="post-body">
            <div class="post-meta">
              <router-link v-bind:to="'/san-pham-khuyen-mai/' + product.advertiser_id" class="post-category cat-2">{{ product.advertiser_id }}</router-link>
              <span class="post-date post-category cat-1" v-if="product.product_discounted_percentage > 0" >Giảm giá: {{ formatPercent(product.product_discounted_percentage) }}</span>
              <span class="post-date post-category cat-1 hide" v-else >Hạn KM: Đến khi hết hàng</span>
            </div>
            <h3 class="post-title"><a v-bind:href="product.tracking_link">{{ product.product_name }}</a></h3>
          </div>
        </div>
      </div>
      <span v-bind:key="product.product_id+'-123'"></span>
      <div class="clearfix visible-md visible-lg" v-if="(index-3) % 4 == 0" v-bind:key="product.product_id"></div>
    </template>
    <div class="clearfix"></div>
    <div class="">
      <nav aria-label="...">
        <ul class="pager">
          <li class="" v-if="page > 1"><a href="#" v-on:click="prevPage"><span aria-hidden="true">&larr;</span> Trang trước</a></li>
          <li class="" v-if="page < totalPage"><a href="#" v-on:click="nextPage">Trang sau <span aria-hidden="true">&rarr;</span></a></li>
        </ul>
      </nav>
    </div>
  </div>
  <div v-else>
    <div class="alert alert-warning text-center">Không có khuyến mại nào ở mục này</div>
  </div>
</template>

<script>
import ProductsService from '@/services/ProductsService'
export default {
  name: 'products',
  data () {
    return {
      products: [],
      page: 1,
      totalPage: 1,
      oid: 'tong-hop',
      s: ''
    }
  },
  mounted () {
    this.oid = this.$route.params.oid !== '' ? this.$route.params.oid : 'tong-hop'
    this.s = this.$route.params.s !== '' ? this.$route.params.s : 'san-pham'
    this.page = this.$route.params.page > 0 ? parseInt(this.$route.params.page) : 1
    this.getPosts()
  },
  watch: {
    '$route' (to, from) {
      // console.log('============to============= getPosts ')
      // console.log(to)
      // console.log('============to============= getPosts ')
      this.oid = to.params.oid ? to.params.oid : ''
      this.s = to.params.s ? to.params.s : ''
      this.page = to.params.page ? parseInt(to.params.page) : 1
      this.getPosts()
    },
    'page' () {
      this.oid = this.oid && this.oid !== '' ? this.oid : 'tong-hop'
      this.s = this.s && this.s !== '' ? this.s : 'san-pham'
      this.page = this.page && this.page > 0 ? this.page : 1
      this.$router.push('/san-pham-khuyen-mai/' + this.oid + '/' + this.s + '/' + this.page)
    }
  },
  methods: {
    async getPosts () {
      const response = await ProductsService.fetchProducts(this.oid, this.s, this.page)

      // console.log('============response============= getPosts ')
      // console.log(response.data)
      // console.log('============response============= getPosts ')

      this.page = response.data.page
      this.totalPage = response.data.totalPage
      this.products = response.data.data
    },
    formatTime (time) {
      if (!time) { return '(n/a)' }
      time = new Date(time)
      return ((time.getDate() < 10) ? '0' : '') + time.getDate() + '-' + ((time.getMonth() < 9) ? '0' : '') + (time.getMonth() + 1) + '-' + time.getFullYear()
    },
    prevPage () {
      this.page = this.page > 0 ? this.page - 1 : 1
    },
    nextPage () {
      this.page = this.page < this.totalPage ? parseInt(this.page) + 1 : 1
    },
    formatPercent (percent) {
      return percent.toFixed(0) + '%'
    }
  }
}
</script>
