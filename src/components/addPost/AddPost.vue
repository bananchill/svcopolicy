<template>
  <div class="add">
    <div class="user__active__add">
      <button
          class="button__choose"
          @click="toggleContainer(!containerShow)"
      > Добавить
      </button>
    </div>
    <div class="data__post__container" v-if="containerShow">
      <div class="title__container">
        <span class="title">
            Добавление поста
        </span>
      </div>
      <div class="title__post">
        <span class="title">Заголовок </span>
        <input type="text" class="input__title" v-model="title">

      </div>
      <div class="block__body">
        <div class="title__body">
           <span class="title">
          Текст
        </span>
        </div>
        <div class="body__post ">
          <textarea
              class="textarea__body"
              v-model="body"></textarea>
        </div>

      </div>
      <div class="post__add">
        <button
            class="save__post button__choose"
            @click="savePostAsync"
        >
          Сохранить
        </button>
        <button
            class="close__save button__choose"
            @click="toggleContainer(!containerShow)"
        >
          Отмена
        </button>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "addPost",
  data() {
    return {
      containerShow: false,
      title: '',
      body: '',
    }
  },
  emits: ['updateData'],
  computed: {
    postApi() {
      return this.$app.interfaces.postApi
    }
  },
  methods: {
    async savePostAsync() {
      try {
        if (this.title.length <= 0 && this.body.length <= 0) {
          alert('Заполните все поля')
          return
        }
        const body = {
          title: this.title,
          body: this.body,
          userId: this.$route.params['id']
        }
        await this.postApi.createPostAsync(body)
        this.$emit('updateData')
        this.title = '';
        this.body = '';

      } catch (e) {
        console.log(`error creating a comment, ${e.message}`)
      }
    },
    toggleContainer(_containerShow){
      this.containerShow = _containerShow
    }
  }
}
</script>

<style lang="scss" scoped>
@import "addPost.scss";
</style>
