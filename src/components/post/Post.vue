<template>
  <div class="container__posts" v-if="userPosts">
    <div class="post_add">
      <AddPost/>
    </div>
    <div
        class="show__post"
        v-for="(post, index) in userPosts"
        :key="index"
    >
      <div class="post__info">
        <div class="user__avatar">
          <img src="../../static/usersUn.jpg" alt="" class="avatar">
        </div>
        <div class="info__post">
          <div class="title__post">
        <span class="text__title">
          {{ post?.title }}
        </span>
          </div>
          <div class="body__post">
        <span class="text__body">
         {{ post?.body }}
          </span>
          </div>
        </div>
      </div>
      <hr/>
      <Comment v-if="post?.comment"
          :comment="post?.comment[0]"
          @updateData="refreshAsync"
      />
    </div>
  </div>
</template>

<script>
import Comment from "@/components/comment/Comment";
import AddPost from "@/components/addPost/AddPost";

export default {
  name: 'AllPost',
  components: {
    Comment,
    AddPost
  },
  data() {
    return {
      isVisibleAnswerButton: false,
      userPosts: {
        type: Array,
        default: null,
      }
    }
  },
  computed: {
    postApi() {
      return this.$app.interfaces.postApi
    },
    commentApi(){
      return this.$app.interfaces.commentApi
    }
  },

  async created() {
    await this.refreshAsync()
  },
  methods: {
    async refreshAsync() {
      await this.getUserPosts()
      await this.getUsersComment()
    },
    async getUserPosts() {
      try {
        console.log(this, 21234)
        const res = await this.postApi.getInfoAsync(this.$route.params['id'])
        this.userPosts = res
        console.log(res)
      } catch (e) {
        console.log(`failed get posts ${e.message}`)
      }
    },
    visibleAnswerButtonImpl(_isVisible) {
      this.isVisibleAnswerButton = !_isVisible
    },
    async getUsersComment() {
      try {
        const res = await this.commentApi.getInfoAsync(this.userPosts)
        this.userPosts = res
        console.log(res, 4)
      } catch (e) {
        console.log(`failed get comments ${e.message}`)
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "style/Post";
</style>
