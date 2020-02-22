<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="register-from">
        <div class="logo-wrapper">
           <img class="logo" src="/static/images/logo.png">
           <div class="tagline">Open source task management tool</div>
        </div>
        <form @submit.prevent="submitForm">
          <div v-show="errorMessage" class="alert alert-danger failed">
            {{ errorMessage }}
          </div>
          <div class="form-group">
            <label for="username">Username</label>
            <input type="text" id="username" class="form-control" v-model="form.username"/>
          </div>
          <div class="form-group">
            <label for="emailAddress">Email Address</label>
            <input type="text" id="emailAddress" class="form-control" v-model="form.emailAddress"/>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" class="form-control" v-model="form.password"/>
          </div>
          <button type="submit" class="btn btn-primary btn-block">Create account</button>
          <p class="accept-terms text-muted">By clicking “Create account”, you agree to our <a href="#">terms of service</a> and <a href="#">privacy policy</a>.</p>
          <p class="text-center text-muted">Already have an account? <a href="/login">Sign in</a></p>
        </form>
      </div>
    </div>
    <footer class="footer">
      <span class="copyright">&copy; 2018 TaskAgile.com</span>
      <ul class="footer-links list-inline float-right">
        <li class="list-inline-item"><a href="#">About</a></li>
        <li class="list-inline-item"><a href="#">Terms of Service</a></li>
        <li class="list-inline-item"><a href="#">Privacy Policy</a></li>
        <li class="list-inline-item"><a href="https://github.com/taskagile/vuejs.spring-boot.mysql" target="_blank">GitHub</a></li>
      </ul>
    </footer>
  </div>
</template>

<script>
import registrationService from '@/services/registration'
import { required, email, minLength, maxLength, alphaNum } from 'vuelidate/lib/validators'

export default {
  name: 'RegisterPage',
  data: function () {
    return {
      form: {
        username: '',
        emailAddress: '',
        password: ''
      },
      errorMessage: ''
    }
  },
  validations: {
    form: {
      username: {
        required,
        minLength: minLength(2),
        maxLength: maxLength(50),
        alphaNum
      },
      emailAddress: {
        required,
        email,
        maxLength: maxLength(100)
      },
      password: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(30)
      }
    }
  },
  methods: {
    submitForm () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        console.log('Invalid!')
        console.log(this.form)
        return
      }
      registrationService.register(this.form).then(() => {
        this.$router.push({ name: 'LoginPage' })
      })
        .catch((error) => {
          this.errorMessage = 'Failed to register user. Reason: ' + (error.message ? error.message : 'Unknown') + '.'
        })
    }
  }
}
</script>
<style>
  .container {max-width: 900px;}
  .register-form {margin-top: 50px; max-width: 320px;}
  .logo-wrapper {margin-bottom: 40px;}
  .footer {width: 100%; line-height: 40px; margin-top: 50px; }
</style>
