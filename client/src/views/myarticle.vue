<template>
  <div class="container">
      <div class="row">
          <div class="col-sm-6 col-md-6 col-lg-8">
            <div>
              <addArticle v-if="isLogin" ></addArticle>
              <router-view :updatecomponent="updatecomponent"></router-view>
            </div>
          </div>
          <div class="col-sm-6 col-md-6 col-lg-4">
            <list></list>
            <banner></banner>
          </div>
        </div>
  </div>
</template>

<script>
import config from '@/config.js'
import addArticle from '@/components/addArticle.vue'
import banner from '@/components/banner.vue'
import list from '@/components/list.vue'
export default {
  props:['id', 'isLogin', 'updatecomponent'],
  components : {
    addArticle,
    banner,
    list
  },
}
</script>

