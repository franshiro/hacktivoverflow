<template>
  <div class="modal fade" id="modalArticle" tabindex="-1" role="dialog" aria-labelledby="modalArticle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalCenterTitle">Register</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-row">
              <div class="form-group col-md-12">
                <label for="inputTitle">Title</label>
                <input type="text" class="form-control" id="inputTitle" v-model="title"  placeholder="Title ... ">
              </div>
              <div class="form-group col-md-12">
                <label for="inputContent">Content</label>
                <wysiwyg v-model="content" />
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary"  data-dismiss="modal" @click="addArticle">Add Article</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import config from '@/config.js'
export default {
  props : ['getarticle', 'updatecomponent'],
  data(){
    return {
      title : '',
      content : '',
      category : '',
    }
  },
  methods : {
    addArticle : function(){
      self = this
      axios({
        method : 'POST',
        url : `${config.port}/articles/add`,
        headers : {
          token : localStorage.getItem('token')
        },
        data :{
          title : self.title,
          article : self.content,
          category : self.category,
          img : self.img
        }
      })
      .then(response => {
        this.content = ''
        this.title = ''
        this.category = ''
        this.getarticle()
        this.updatecomponent()
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style>

</style>
