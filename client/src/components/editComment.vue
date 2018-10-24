<template>
  <div class="modal fade" id="editComment" tabindex="-1" role="dialog" aria-labelledby="editComment" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Edit : {{sendid}}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-row">
              <div class="form-group col-md-12">
                <label for="inputContent">Comment</label>
                <wysiwyg v-model="comment" />
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary"  data-dismiss="modal" @click="updateComment">Update</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import config from '@/config.js'
export default {
  props : ['sendid', 'getdetailarticle'],
  data(){
    return {
      title : '',
      comment : '',
      category : '',
      img : '',
      id : ''
    }
  },
  watch: {
    sendid() {
      this.getComment()
    },
  },
  created : function(){
    // this.getComment()
  },
  methods : {
    getComment(){
      axios({
        method : 'GET',
        url : `${config.port}/comments/showmy/${this.sendid}`,
        headers : {
          token : localStorage.getItem('token')
        }
      })
      .then(response => {
        console.log(response.data)
        this.comment = response.data.comment
      })
      .catch(err => {
        console.log(err)
      })
    },
    updateComment(){
      axios({
        method : 'PUT',
        url : `${config.port}/comments/edit/${this.sendid}`,
        headers : {
          token : localStorage.getItem('token')
        },
        data : {
          comment : this.comment
        }
      })
      .then(response => {
        this.getdetailarticle()
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
