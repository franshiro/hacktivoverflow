<template>
    <div class="card mt-4">
      <div class="container border" v-for="(value) in myArticle" :key="value._id">
         <div class="my-article" @click="detailArticle(value._id)">
          <h3><strong>{{value.title}}</strong></h3>
          <p class="card-text">Posted by <strong style="color:blue">{{value.username}}</strong>, {{value.createdAt | moment("from", "now", true)}} ago</p>
        </div>
        <div class="py-3" v-if="username == value.username && username != ''">
          <button type="button" class="btn btn-secondary my-2 my-sm-0" @click="getId(value._id)" data-toggle="modal" data-target="#modalEdit">Edit</button>
          <button class="btn btn-secondary" @click="deleteArticle(value._id)" title="delete">Delete</button>
        </div>
    </div>
    <modalEdit :id="idArticle" :getmylist="getMyList" :updatecomponent="updatecomponent"></modalEdit>
  </div>
</template>

<script>
import config from '@/config.js'
import modalEdit from '@/components/modalEdit.vue'
export default {
  components :{
    modalEdit
  },
  props : ['article', 'category', 'updatecomponent'],
  data() {
    return {
      myArticle : '',
      username : '',
      idArticle : ''
    }
  },
  watch: {
    category() {
      this.username = localStorage.getItem('username')
      if(this.category === 'all'){
        this.getMyList()
      }
      else {
        this.getListByCategory()
      }
    },
  },
  created : function(){
    this.username  = localStorage.getItem('username')
    if(this.username){
      if(this.category === 'all'){
        this.getMyList()
      }
      else{
        this.getListByCategory()
      }
    }
    else{
      this.$router.push({
        name : 'home'
      })
    }
  },
  methods: {
    getId(value){
      this.idArticle = value
    },
    deleteArticle : function(value){
      axios({
        method : 'DELETE',
        url : `${config.port}/articles/delete/${value}`,
        headers : {
          token : localStorage.getItem('token')
        }
      })
      .then(response => {
        this.getMyList()
        this.updatecomponent()
      })
      .catch(err => {
        console.log(err)
      })
    },
    detailArticle(articleId) {
      this.$router.push({
        name : 'detailArticle',
        params : {
            id : articleId
        }
      })      
    },
    getMyList(){
      axios({
        method : 'GET',
        url : `${config.port}/articles/myarticle`,
        headers : {
          token : localStorage.getItem('token')
        }
      })
      .then(response => {
        this.myArticle = response.data
      })
      .catch(err => {
        console.log(err)
      })
    },
    getListByCategory(){
      axios({
        method : 'GET',
        url : `${config.port}/articles/show`,
      })
      .then(response => {
        let byCategory = response.data.filter(datum => {
          return this.category === datum.category
        })
        this.myArticle = byCategory
      })
      .catch(err => {
        console.log(err)
      })
    }      
  },
}
</script>

<style scoped>
  .container{
    margin-top: 1%;
    margin-bottom: 1%;
    width: 98%;
  }
</style>
