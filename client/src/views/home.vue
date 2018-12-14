<template>
    <div class="container">
      <div class="row">
        <div class="col-sm-6 col-md-6 col-lg-8">
          <div class="content">
            <searchWidget @searchArticle="searchArticle"></searchWidget>
            <articlelist :article="article"></articlelist>
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
import banner from '@/components/banner.vue'
import articlelist from '@/components/articlelist.vue'
import searchWidget from '@/components/searchWidget.vue'
import list from '@/components/list.vue'
export default {
  props : ['article'],
  components : {
    articlelist,
    searchWidget,
    list,
    banner
  },
  methods: {
    searchArticle(value) {
      this.$emit('searchArticle', value)
    },
  },

}
</script>

<style scoped>
  .content{
    margin-top: 22px;
    width: 100%;
  }
</style>
