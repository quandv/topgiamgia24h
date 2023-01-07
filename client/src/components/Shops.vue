<template>
  <div id="shops" class="row" v-if="shops.length > 0">
    <div class="col-md-12">
      <h3><i class="fa fa-star-o"></i> Nguồn tin khuyến mại</h3>
    </div>
    <template v-for="shop in shops">
      <div class="col-lg-2 col-md-2 col-sm-3 col-xs-6 shop-row" v-bind:key="shop._id+'-abc'">
        <div class="shop text-center">
          <router-link v-bind:to="'/khuyen-mai/' + shop.offer_id" class="shop-img"><img v-bind:src="shop.avatar" v-bind:alt="shop.name"></router-link>
          <div class="shop-body">
            <h3 class="shop-title"><router-link v-bind:to="'/khuyen-mai/' + shop.offer_id" class="shop-category cat-2">{{ shop.name }}</router-link></h3>
          </div>
        </div>
      </div>
      <span v-bind:key="shop._id+'-123'"></span>
    </template>
  </div>
  <div v-else>
    <div class="alert alert-warning text-center">Nguồn tin đang được cập nhật...</div>
  </div>
</template>

<script>
import ShopsService from '@/services/ShopsService'
export default {
  name: 'shops',
  data () {
    return {
      shops: []
    }
  },
  mounted () {
    this.getShops()
  },
  methods: {
    async getShops () {
      const response = await ShopsService.fetchShops()
      this.shops = response.data
    }
  }
}
</script>
