<template>
  <div class="create-post-page">
    <h4>新建文章</h4>
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">文章标题：</label>
        <validate-input
          :rules="titleRules"
          v-model="titleVal"
          placeholder="请输入文章标题"
          type="text"
        ></validate-input>
      </div>
      <div class="mb-3">
        <label class="form-label">文章详情：</label>
        <validate-input
          :rules="contentRules"
          v-model="contentVal"
          placeholder="请输入文章详情"
          type="text"
          tag="textarea"
          rows="10"
        ></validate-input>
      </div>
      <template #submit>
        <button class="btn btn-primary btn-large">发表文章</button>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ValidateForm from '@/components/ValidateForm.vue'
import ValidateInput, { RulesProp } from '@/components/ValidateInput.vue'
import { GlobalDataProps, PostProps } from '@/store'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'CreatePost',
  components: {
    ValidateForm,
    ValidateInput
  },
  setup () {
    const store = useStore<GlobalDataProps>()
    const router = useRouter()

    const titleVal = ref('')
    const titleRules: RulesProp = [
      { type: 'required', message: '文章标题不能为空' }
    ]
    const contentVal = ref('')
    const contentRules: RulesProp = [
      { type: 'required', message: '文章详情不能为空' }
    ]

    const onFormSubmit = (result: boolean) => {
      if (result) {
        const { column } = store.state.user
        if (column) {
          const newPost: PostProps = {
            _id: new Date().getTime().toString(),
            title: titleVal.value,
            content: contentVal.value,
            column,
            createdAt: new Date().toLocaleString()
          }
          store.commit('createPost', newPost)
          router.push({ name: 'column', params: { id: column } })
        }
      }
    }

    return {
      titleVal,
      titleRules,
      contentVal,
      contentRules,
      onFormSubmit
    }
  }
})
</script>

<style scoped>

</style>
