<template>
  <div class="modal fade" id="modalRegister" tabindex="-1" role="dialog" aria-labelledby="modalRegister" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-sm" role="document">
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
                <label for="inputEmail4">Email</label>
                <input type="email" class="form-control" id="inputEmail" v-model="email"  placeholder="Email">
              </div>
              <div class="form-group col-md-12">
                <label for="inputPassword4">Password</label>
                <input type="password" class="form-control" id="inputPassword" v-model="password"  placeholder="Password">
              </div>
            </div>
            <div class="form-group col-md-12">
              <label for="inputUsername">Name</label>
              <input type="text" class="form-control" id="inputUsername" v-model="username"  placeholder="Username">
            </div>
            <div class="btn btn-danger" v-if="errMessage">
              <div class="btn btn-danger">
                <label>Invalid Email or Username</label>
              </div>
              <br/>
              <div class="btn btn-danger">
                <label>Password must be greather than 7</label>
              </div>
            </div>
             <div v-if="successLogin">
              <div class="btn btn-success" data-dismiss='modal' data-toggle='modal' data-target='#modalLogin'>
                <label>Register Success</label>
                <br>
                <label>Goto Login</label>
              </div>
            </div>
            
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="register">Register</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import config from '@/config.js'
export default {
  data(){
    return {
      email:'',
      password:'',
      username: '',
      errMessage : false,
      successLogin : false
    }
  },
  methods : {
    register : function(){
      self = this
      axios({
        method : 'POST',
        url : `${config.port}/users/register`,
        data : {
          email : self.email,
          password : self.password,
          username : self.username
        }
      })
      .then(response => {
        this.email = '',
        this.password = '',
        this.username = ''
        this.successLogin = true
        this.errMessage = false
      })
      .catch(err => {
        console.log(err)
        this.email = '',
        this.password = '',
        this.username = '',
        this.successLogin = false
        this.errMessage = true
      })
    }
  }
}
</script>

<style>

</style>
