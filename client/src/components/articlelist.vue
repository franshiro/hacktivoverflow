<template>
  <div class="col-md-8">
    <div class="container py-3" v-for="(value, index) in article" :key="index">
      <div id="div-link" class="card-body container border" @click="detailArticle(value._id)">
        <div>
          {{value.title}}
        </div>
        <p class="card-text">Posted on {{value.createAt}}</p>
        <p class="card-text">by {{value.username}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props : ['article'],
  data() {
      return {
          
      }
  },
  methods: {
    detailArticle(articleId) {
      this.$router.push({
        name : 'detailArticle',
        params : {
            id : articleId
        }
      })      
    },
  },
}
</script>

<style>
.card{
  width: 95%!important;
}
.col-md-4{
  width: 100%!important
}
#div-link {
        cursor: pointer;
    }
</style>
