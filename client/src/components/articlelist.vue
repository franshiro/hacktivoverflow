<template>
  <div class="card mt-4">
    <div class="container" v-for="(value, index) in article" :key="index">
      <div class="detail" @click="detailArticle(value._id)">
        <div>
        <p class="card-text">Posted by <strong style="color:blue">{{value.username}}</strong>, {{value.createdAt | moment("from", "now", true)}} ago</p>
        </div>
          <h3><strong>{{value.title}}</strong></h3>
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

<style scoped>
  .card{
    width: 100%!important;
  }
  .container{
    width: 100%;
  }
  .detail{
    margin : 1%;
    border: 1px solid gray;
    border-radius: 5px;
    padding-top: 10px;
    padding-bottom : 10px;
    cursor: pointer;
  }
  .detail:hover{
    border: 1px solid blue;
    color : blue;
  }

</style>
