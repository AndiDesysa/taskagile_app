import { mount, createLocalVue } from '@vue/test-utils'
import RegisterPage from '@/views/RegisterPage'
import VueRouter from 'vue-router'
import Vuelidate from 'vuelidate'
import registrationService from '@/services/registration'

// Adding Vue Router to the test so that
// we can access vm.$router
const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(Vuelidate)
const router = new VueRouter()

// Mock dependency registratioService
jest.mock('@/services/registration')

describe('RegisterPage.vue', () => {
  it('should render correct content', () => {
    const Constructor = localVue.extend(RegisterPage)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.logo').getAttribute('src'))
      .toEqual('/static/images/logo.png')
    expect(vm.$el.querySelector('.tagline').textContent)
      .toEqual('Open source task management tool')
    expect(vm.$el.querySelector('#username').value)
      .toEqual('')
    expect(vm.$el.querySelector('#emailAddress').value)
      .toEqual('')
    expect(vm.$el.querySelector('#password').value)
      .toEqual('')
    expect(vm.$el.querySelector('form button[type="submit"]').textContent)
      .toEqual('Create account')
  })
})

describe('RegisterPage.vue using test-utils', () => {
  let wrapper
  let fieldUsername
  let fieldEmailAddress
  let fieldPassword
  let buttonSubmit
  let registerSpy

  beforeEach(() => {
    wrapper = mount(RegisterPage, {
      localVue,
      router
    })
    fieldUsername = wrapper.find('#username')
    fieldEmailAddress = wrapper.find('#emailAddress')
    fieldPassword = wrapper.find('#password')
    buttonSubmit = wrapper.find('form button[type="submit"]')
    registerSpy = jest.spyOn(registrationService, 'register')
  })

  afterEach(() => {
    registerSpy.mockReset()
    registerSpy.mockRestore()
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })

  it('should render registration form', () => {
    expect(wrapper.find('.logo').attributes().src).toEqual('/static/images/logo.png')
    expect(wrapper.find('.tagline').text()).toEqual('Open source task management tool')
    expect(fieldUsername.element.value).toEqual('')// element is of type HTMLInputElement
    expect(fieldEmailAddress.element.value).toEqual('')
    expect(fieldPassword.element.value).toEqual('')
    expect(buttonSubmit.text()).toEqual('Create account')
  })

  it('should have form inputs bound with data model', () => {
    const username = 'sunny'
    const emailAddress = 'sunny@local'
    const password = 'VueJsRocks!'

    wrapper.vm.form.username = username
    wrapper.vm.form.emailAddress = emailAddress
    wrapper.vm.form.password = password
    expect(fieldUsername.element.value).toEqual(username)
    expect(fieldEmailAddress.element.value).toEqual(emailAddress)
    expect(fieldPassword.element.value).toEqual(password)
  })

  it('should have form submit event handler `submitForm`', () => {
    const stub = jest.fn()
    wrapper.setMethods({ submitForm: stub })
    buttonSubmit.trigger('submit')
    expect(stub).toBeCalled()
  })

  it('should register when it is a new user', async () => {
    expect.assertions(2)
    const stub = jest.fn()
    wrapper.vm.$router.push = stub // push method is now the stub
    wrapper.vm.form.username = 'Sunny'
    wrapper.vm.form.emailAddress = 'sunny@local.com'
    wrapper.vm.form.password = 'JestRocks!'
    wrapper.vm.submitForm() // in the implementation the router should navigate to "Login"
    expect(registerSpy).toHaveBeenCalled()
    await wrapper.vm.$nextTick()
    expect(stub).toHaveBeenCalledWith({ name: 'LoginPage' })
  })

  it('should fail it is not a new user', async () => {
    // In the mock, only sunny@local is a new user
    expect.assertions(3)
    wrapper.vm.form.username = 'Ted'
    wrapper.vm.form.emailAddress = 'ted@local.com'
    wrapper.vm.form.password = 'TedsFat!'
    expect(wrapper.find('.failed').isVisible()).toBe(false)
    wrapper.vm.submitForm()
    expect(registerSpy).toHaveBeenCalled()
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.failed').isVisible()).toBe(true)
  })

  it('should fail when the email address is invalid', () => {
    wrapper.vm.form.username = 'Ted'
    wrapper.vm.form.emailAddress = 'bad-email-address'
    wrapper.vm.form.password = 'TedsFat!'
    wrapper.vm.submitForm()
    expect(registerSpy).not.toHaveBeenCalled()
  })

  it('should fail when the name is invalid', () => {
    wrapper.vm.form.username = '0'
    wrapper.vm.form.emailAddress = 'ted@local.com'
    wrapper.vm.form.password = 'TedsFat!'
    wrapper.vm.submitForm()
    expect(registerSpy).not.toHaveBeenCalled()
  })

  it('should fail when the password is invalid', () => {
    wrapper.vm.form.username = 'Ted'
    wrapper.vm.form.emailAddress = 'ted@local.com'
    wrapper.vm.form.password = '12345'
    wrapper.vm.submitForm()
    expect(registerSpy).not.toHaveBeenCalled()
  })
})
