<template>
  <div id="app">
    <header id="header">
      <div id="nav">
        <div id="nav-fixed">
          <div class="container">
            <div class="nav-logo">
              <router-link v-bind:to="'/'" class="logo"><img src="../static/img/logo.png" alt=""></router-link>
            </div>

            <ul class="nav-menu nav navbar-nav">
              <li><router-link v-bind:to="'/'">Tin tổng hợp</router-link></li>
              <li class="cat-2"><router-link v-bind:to="'/khuyen-mai-hot'">HOT</router-link></li>
              <li class="cat-3 hide"><router-link v-bind:to="'/san-pham-khuyen-mai'">Giảm giá sâu</router-link></li>
              <li class="cat-1"><router-link v-bind:to="'/ma-giam-gia'">Mã giảm giá</router-link></li>
              <li><router-link v-bind:to="'/nguon-tin'">Nguồn tin</router-link></li>
            </ul>

            <div class="nav-btns">
              <button class="aside-btn"><i class="fa fa-bars"></i></button>
              <button class="search-btn"><i class="fa fa-search"></i></button>
              <div class="search-form">
                <input id="stxt" class="search-input" type="text" name="search" placeholder="Bạn muốn tìm kiếm..." v-on:keyup.enter="search">
                <button class="search-close"><i class="fa fa-times"></i></button>
              </div>
            </div>
          </div>
        </div>

        <div id="nav-aside">
          <div class="section-row">
            <ul class="nav-aside-menu">
              <li><router-link v-bind:to="'/'">Tin tổng hợp</router-link></li>
              <li><router-link v-bind:to="'/khuyen-mai-hot'">HOT</router-link></li>
              <li><router-link v-bind:to="'/san-pham-khuyen-mai'">Giảm giá sâu</router-link></li>
              <li><router-link v-bind:to="'/ma-giam-gia'">Mã giảm giá</router-link></li>
              <li><router-link v-bind:to="'/nguon-tin'">Nguồn tin</router-link></li>
            </ul>
          </div>

          <div class="section-row">
            <h3>Cộng đồng</h3>
            <ul class="nav-aside-social">
              <li><a href="https://www.facebook.com/topgiamgia24h" target="_blank"><i class="fa fa-facebook"></i></a></li>
            </ul>
          </div>

          <button class="nav-aside-close"><i class="fa fa-times"></i></button>
        </div>
      </div>
    </header>

    <div class="section">
      <div class="container">
        <div class="shop-slider">
          <marquee behavior="scroll" direction="left" onmouseover="this.stop()" onmouseout="this.start()">
            <template v-for="shop in shops">
            <div class="shop" v-bind:key="shop.name+'-abc'">
            <router-link v-if="routename === 'Hot'" v-bind:to="'/khuyen-mai-hot/' + shop.offer_id"><img v-bind:src="shop.avatar" v-bind:alt="shop.name"></router-link>
            <router-link v-else-if="routename === 'Coupon'" v-bind:to="'/ma-giam-gia/' + shop.offer_id"><img v-bind:src="shop.avatar" v-bind:alt="shop.name"></router-link>
            <router-link v-else v-bind:to="'/khuyen-mai/' + shop.offer_id"><img v-bind:src="shop.avatar" v-bind:alt="shop.name"></router-link>
            </div>
            <div class="shop" v-bind:key="shop.name+'-123'"></div>
            </template>
          </marquee>
          <br>
        </div>
        <div class="clearfix"></div>
        <router-view/>
      </div>
    </div>

    <footer id="footer">
      <div class="container">
        <div class="row">
          <div class="col-md-5">
            <div class="footer-widget">
              <div class="footer-logo">
                <a href="index.html" class="logo"><img src="../static/img/logo.png" alt=""></a>
              </div>
              <ul class="footer-nav hide">
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Advertisement</a></li>
              </ul>
              <div class="footer-copyright">
                <p>&copy; Copyright by topgiamgia24h.com &copy; 2018 </p>
                <p>Cập nhật liên tục thông tin khuyến mại, mã giảm giá hỗ trợ người tiêu dùng</p>
              </div>
            </div>
          </div>

          <div class="col-md-4">
            <div class="row">
              <div class="col-md-6">
                <div class="footer-widget">
                  <h3 class="footer-title">Nguồn tin</h3>
                  <ul class="footer-links">
                    <li><router-link v-bind:to="'/khuyen-mai/shopee'">Shopee</router-link></li>
                    <li><router-link v-bind:to="'/khuyen-mai/tiki'">Tiki</router-link></li>
                    <li><router-link v-bind:to="'/khuyen-mai/adayroi'">Adayroi</router-link></li>
                    <li><router-link v-bind:to="'/khuyen-mai/lotte'">Lotte</router-link></li>
                    <li><router-link v-bind:to="'/khuyen-mai/fado'">Fado</router-link></li>
                  </ul>
                </div>
              </div>
              <div class="col-md-6">
                <div class="footer-widget">
                  <h3 class="footer-title">&nbsp;</h3>
                  <ul class="footer-links">
                    <li><router-link v-bind:to="'/khuyen-mai/fptshop'">FPTshop</router-link></li>
                    <li><router-link v-bind:to="'/khuyen-mai/yes24'">Yes24</router-link></li>
                    <li><router-link v-bind:to="'/khuyen-mai/thefaceshop'">Thefaceshop</router-link></li>
                    <li><router-link v-bind:to="'/khuyen-mai/aeoneshop'">Aeoneshop</router-link></li>
                    <li><router-link v-bind:to="'/khuyen-mai/hcenter'">HC</router-link></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-3">
            <div class="footer-widget">
              <h3 class="footer-title">Cộng đồng</h3>
              <ul class="footer-social">
                <li><a href="https://www.facebook.com/pg/TOP-GIẢM-GIÁ-24H-263359241181845" target="_blank"><i class="fa fa-facebook"></i></a></li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import ShopsService from '@/services/ShopsService'
export default {
  name: 'App',
  data () {
    return {
      shops: [],
      routename: this.$route.name
    }
  },
  mounted () {
    this.getShops()
  },
  watch: {
    $route (to, from) {
      this.routename = this.$route.name
    }
  },
  methods: {
    async getShops () {
      const response = await ShopsService.fetchShops()
      this.shops = response.data
    },
    search () {
      console.log('============this.$route============= getPosts ')
      console.log(this.$route)
      console.log('============this.$route============= getPosts ')
      var oid = this.$route.params.oid ? this.$route.params.oid : 'tong-hop'
      var s = document.getElementById('stxt').value !== '' ? document.getElementById('stxt').value : 'tin-khuyen-mai'
      switch (this.$route.name) {
        case 'Hot': this.$router.push('/khuyen-mai-hot/' + oid + '/' + s + '/' + 1); break
        case 'Coupon': this.$router.push('/ma-giam-gia/' + oid + '/' + s + '/' + 1); break
        default: this.$router.push('/khuyen-mai/' + oid + '/' + s + '/' + 1)
      }
    }
  }
}
</script>
