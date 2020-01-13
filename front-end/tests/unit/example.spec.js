import Vue from 'vue'
import LoginPage from '@/views/LoginPage.vue'

describe('LoginPage.vue', () => {
  it('should render contents correctly', () => {
    const Constructor = Vue.extend(LoginPage)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('h1').textContent).toEqual('TaskAgile')
  })
})
