<template>
  <div id="posts" class="row" v-if="posts.length > 0">
    <div class="col-md-12">
      <h3><i class="fa fa-star-o"></i> Tin khuyến mại</h3>
    </div>
    <template v-for="(post, index) in posts">
      <div class="col-md-4" v-bind:key="post.id+'-abc'">
        <div class="post">
          <a class="post-img" v-bind:href="post.aff_url"><img v-bind:src="post.thumbnail" v-bind:alt="post.title"></a>
          <div class="post-body">
            <div class="post-meta">
              <router-link v-bind:to="'/khuyen-mai/' + post.offer_id" class="post-category cat-2">{{ post.offer_id }}</router-link>
              <span class="post-date post-category cat-1" v-if="post.expired_date != null" >Hạn KM: {{ formatTime(post.expired_date_format) }}</span>
              <span class="post-date post-category cat-1" v-else >Hạn KM: Đến khi hết hàng</span>
            </div>
            <div class="coupon" v-if="post.coupon_code && post.coupon_code != ''">
              <p class="text-center"><button type="button" class="post-coupon btn btn-primary" v-on:click="showCoupon(post.coupon_code)">Nhận mã giảm giá</button></p>
            </div>
            <h3 class="post-title"><a v-bind:href="post.aff_url">{{ post.title }}</a></h3>
          </div>
        </div>
      </div>
      <span v-bind:key="post.id+'-123'"></span>
      <div class="clearfix visible-md visible-lg" v-if="(index-2) % 3 == 0" v-bind:key="post.id"></div>
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
import PostsService from '@/services/PostsService'
export default {
  name: 'posts',
  data () {
    return {
      posts: [],
      page: 1,
      totalPage: 1,
      oid: 'tong-hop',
      s: ''
    }
  },
  mounted () {
    this.oid = this.$route.params.oid !== '' ? this.$route.params.oid : 'tong-hop'
    this.s = this.$route.params.s !== '' ? this.$route.params.s : 'tin-khuyen-mai'
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
      this.s = this.s && this.s !== '' ? this.s : 'tin-khuyen-mai'
      this.page = this.page && this.page > 0 ? this.page : 1
      this.$router.push('/khuyen-mai/' + this.oid + '/' + this.s + '/' + this.page)
    }
  },
  methods: {
    async getPosts () {
      const response = await PostsService.fetchPosts(this.oid, this.s, this.page)

      // console.log('============response============= getPosts ')
      // console.log(response.data)
      // console.log('============response============= getPosts ')

      this.page = response.data.page
      this.totalPage = response.data.totalPage
      this.posts = response.data.data
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
    showCoupon (coupon) {
      alert('Mã giảm giá của bạn: ' + coupon)
    }
  }
}
</script>
