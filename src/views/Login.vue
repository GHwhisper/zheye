<template>
  <validate-form @form-submit="onFormSubmit">
    <div class="mb-3">
      <label class="form-label">邮箱地址</label>
      <validate-input
        type="text"
        placeholder="请输入邮箱地址"
        :rules="emailRules"
        v-model="emailVal"
      ></validate-input>
    </div>
    <div class="mb-3">
      <label class="form-label">密码</label>
      <validate-input
        type="password"
        placeholder="请输入密码"
        :rules="passwordRules"
        v-model="passwordVal"
      ></validate-input>
    </div>
    <template #submit>
      <span class="btn btn-primary">登录</span>
    </template>
  </validate-form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ValidateForm from '@/components/ValidateForm.vue'
import ValidateInput, { RulesProp } from '@/components/ValidateInput.vue'
import createMessage from '@/components/createMessage'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'Login',
  components: {
    ValidateForm,
    ValidateInput
  },
  setup () {
    const router = useRouter()
    const store = useStore()

    const emailVal = ref('')
    const emailRules: RulesProp = [
      { type: 'required', message: '电子邮件地址不能为空' },
      { type: 'email', message: '请输入正确的电子邮箱格式' }
    ]
    const passwordVal = ref('')
    const passwordRules: RulesProp = [
      { type: 'required', message: '密码不能为空' }
    ]

    const onFormSubmit = (result: boolean) => {
      if (result) {
        const payload = {
          email: emailVal.value,
          password: passwordVal.value
        }
        store.dispatch('loginAndFetch', payload).then(() => {
          createMessage('登录成功 2秒后跳转首页', 'success')
          setTimeout(() => {
            router.push('/')
          }, 2000)
        }).catch(e => {
          console.log(e)
        })
      }
    }

    return {
      emailRules,
      emailVal,
      passwordRules,
      passwordVal,
      onFormSubmit
    }
  }
})
</script>

<style scoped>

</style>
