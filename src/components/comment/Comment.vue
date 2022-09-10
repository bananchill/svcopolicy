<template>
  <div class="container__comment">
    <div class="show__comment">
      <div class="user__info">
        <div class="user__avatar">
          <img src="../../static/usersUn.jpg" alt="" class="avatar__mini">
        </div>
        <div class="block__email">
          Ответил : <span>
          {{ comment?.email }}
          </span>
        </div>
      </div>
      <div class="comment__info">
        <div class="comment__title">
          <span> {{ comment?.name }}</span>
        </div>
        <div class="comment__body">
          <span> {{ comment?.body }}</span>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "CommentComponent",
  props: {
    comment: {
      type: Array,
      default: null,
    },
  }
}
</script>

<style lang="scss" scoped>
@import "style/Comment";
</style>
