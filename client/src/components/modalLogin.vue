<template>
    <div class="modal fade" id="modalLogin" tabindex="-1" role="dialog" aria-labelledby="modalLogin" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-sm" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalCenterTitle">Login</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-row">
              <div class="form-group col-md-12">
                <label for="inputEmailLogin">Email</label>
                <input type="email" class="form-control" id="inputEmailLogin" v-model="email" placeholder="Email">
              </div>
              <div class="form-group col-md-12">
                <label for="inputPasswordLogin">Password</label>
                <input type="password" class="form-control" id="inputPasswordLogin" v-model="password"  placeholder="Password">
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <div>
              <div id="my-signin2" data-dismiss="modal"></div>
          </div><br>
          <div>
            <button type="button" class="btn btn-primary" @click="login" data-dismiss="modal">Login</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import config from '@/config.js'
export default {
  props : ['gettoken'],
  data(){
    return{
      email : '',
      password : ''
    }
  },
  mounted(){
    this.renderButton()
  },
  methods : {
    onSuccess(googleUser) {
      console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
      axios({
        method : 'POST',
        url : `${config.port}/users/login/google`,
        data : {
          googleToken : googleUser.Zi.id_token
        }
      })
      .then(response => {
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('username', response.data.username)
        this.gettoken()
        this.$router.push({
          name : 'home'
        })
      })
      .catch(err => {
        console.log(err)
      })
    },
     onFailure(error) {
      console.log(error);
    },
     renderButton() {
      gapi.signin2.render('my-signin2', {
        'scope': 'profile email',
        'width': 240,
        'height': 50,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': this.onSuccess,
        'onfailure': this.onFailure
      });
    },
    login : function(){
      // self = this
      axios({
        method : 'POST',
        url : `${config.port}/users/login`,
        data :{
          email : this.email,
          password : this.password
        }
      })
      .then(response => {
        this.email = ''
        this.password = ''
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('username', response.data.username)
        this.gettoken()
        this.$router.push({
          name : 'home'
        })
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
