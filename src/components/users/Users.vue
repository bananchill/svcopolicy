<template>
    <div
        class="user__data"
        v-for="(user, index ) in users"
        :key="index"
    >

      <router-link
          :to="{ name: 'user', params: { id: user.id}, query : {page : 'albums'}}"
          class="user__img"
      >
          <img class="avatar" src="../../static/usersUn.jpg">
      </router-link>
        <div class="user__info">
         <span>
              {{ user.name }}
           </span>
        </div>


      <div class="user__action">
        <router-link
            :to="{ name: 'user', params: { id: user.id}, query : {page : 'albums'}}"
        >
          <button
              class="album">
            <span>
              Альбом
            </span>
          </button>
        </router-link>

        <router-link
            :to="{ name: 'user', params: { id: user.id}, query : {page : 'posts'}}"
        >
          <button class="post">
            <span>
                Посты
            </span>
          </button>
        </router-link>
      </div>

    </div>
</template>

<script>
export default {
  name: "AllUsers",
  props: {
    users: Array,
  },

}
</script>

<style lang="scss" scoped>
@import "style/users";
</style>
