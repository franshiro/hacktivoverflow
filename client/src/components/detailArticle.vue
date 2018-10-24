<template>
  <div id="detail" class="card mb-4" v-if="show">
    <div  class="card-footer text-muted">
      Posted on {{detail.createAt}} by
      <a href="#">{{detail.username}}</a>
    </div>
    <h3>{{detail.title}}</h3>
    <div class="card-body">
        <p class="card-text" v-html="detail.article"></p>
    </div>
    <div id="totalVote" class="d-flex bd-highlight mb-3">
      <div class="mr-auto border">
        <p class="totalVote">Total Vote : {{totalVote}}</p>
      </div>
      <div v-if="username != detail.username && username != ''">
        <button @click="downVote" class="p-2">DownVote</button>
        <button @click="upVote" class="p-2">UpVote</button>
      </div>
    </div>
    <div class="card-footer text-muted">
    <div class="col-sm-12">
        <div class="panel panel-white post panel-shadow">
            <div class="post-footer">
                <div class="input-group"> 
                    <wysiwyg v-model="comment" />
                    <div class="d-flex ml-auto">
                      <span class="input-group-addon">
                        <button class="btn btn-primary" @click="addComment">add comment</button> 
                      </span>
                    </div>
                </div>
                <ul class="comments-list" v-for="(list,index) in detail.comments" :key="index">
                    <li class="comment border">
                        <div id="totalVote" class="d-flex bd-highlight mb-3">
                          <div class="mr-auto border">
                            <p class="totalVote">Total Vote : {{list.vote.length}}</p>
                          </div>
                          <div v-if="username != list.user && username != ''">
                            <button @click="commentDownVote(list._id)" class="p-2">DownVote</button>
                            <button @click="commentUpVote(list._id)" class="p-2">UpVote</button>
                          </div>
                        </div>
                        <div class="comment-body">
                            <div class="comment-heading">
                                <h4 class="user">{{list.user}}</h4>
                            </div>
                            <p v-html="list.comment"></p>
                        </div>
                        <div class="d-flex">
                          <div v-if="username != list.user && username != ''">
                          </div>
                            <button v-if="username == list.user && username != ''" @click="sendId(list._id)" class="ml-auto" data-toggle='modal' data-target='#editComment'>Edit</button>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    </div>
    <editComment :sendid="idComment" :getdetailarticle="getDetailArticle"></editComment>
  </div>
</template>

<script>
import config from '@/config.js'
import editComment from '@/components/editComment.vue'
export default {
    components : {
      editComment
    },
    data(){
      return{
        detail : '',
        show : true, 
        comment : '',
        username : '',
        idComment : '',
        totalVote : 0,
        totalCommentVote : 0
      }
    },
    props : ['id'],
    created : function(){
      this.getDetailArticle()
      this.username = localStorage.getItem('username')
    },
    watch : {
      id(){
        this.getDetailArticle()
      }
    },
    methods: {
      commentUpVote : function(value){
        axios({
          method : 'GET',
          url : `${config.port}/comments/upvote/${value}`,
          headers : {
            token : localStorage.getItem('token')
          }
        })
        .then(response => {
          console.log(response)
          this.getDetailArticle()
        })
        .catch(err => {
          console.log(err)
        })
      },
      upVote : function(){
        axios({
          method : 'GET',
          url : `${config.port}/articles/upvote/${this.detail._id}`,
          headers : {
            token : localStorage.getItem('token')
          }
        })
        .then(response => {
          console.log(response)
          this.getDetailArticle()
        })
        .catch(err => {
          console.log(err)
        })
        
      },
      commentDownVote : function(value){
        axios({
          method : 'GET',
          url : `${config.port}/comments/downvote/${value}`,
          headers : {
            token : localStorage.getItem('token')
          }
        })
        .then(response => {
          console.log(response)
          this.getDetailArticle()
        })
        .catch(err => {
          console.log(err)
        })
      },
      downVote(){
        axios({
          method : 'GET',
          url : `${config.port}/articles/downvote/${this.detail._id}`,
          headers : {
            token : localStorage.getItem('token')
          }
        })
        .then(response => {
          console.log(response)
          this.getDetailArticle()
        })
        .catch(err => {
          console.log(err)
        })
      },
      sendId : function(value){
        this.idComment = value
      },
      addComment : function(){
        axios({
          method : 'POST',
          url : `${config.port}/comments/add`,
          headers : {
            token : localStorage.getItem('token'),
          },
          data : {
            comment : this.comment,
            articleId : this.id
          }
        })
        .then(response => {
          this.comment = '',
          this.username = localStorage.getItem('username')
          this.getDetailArticle()
        })
        .catch(err => {
          console.log(err)
        })
      },
      getDetailArticle() {
        // self = this
        axios({
          method : 'GET',
          url : `${config.port}/articles/show/${this.id}`
        })
        .then(response => {
          this.detail = response.data.article
          console.log(this.detail)
          this.totalVote = this.detail.vote.length
        })
        .catch(err => {
          console.log(err)
        })
      },
    },
}
</script>
<style scoped>
  #detail{
    margin-top : 20px
  }
  .comment{
    margin-top : 15px;
  }
  #totalVote{
    margin-left: 10px;
  }
  .totalVote{
    padding: 5px;
  }
</style>

