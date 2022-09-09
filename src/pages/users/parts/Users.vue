<template>
  <div class="users__container">
    <Users
        v-if="users"
        :users="users"
    />
  </div>
</template>
<script>

import Users from "@/components/users/Users";

export default {
  name: 'UsersPage',
  components: {
    Users
  },
  data() {
    return {
      users: {
        default: null,
        type: []
      },
    }
  },
  async created() {
    await this.refreshAsync();
  },
  computed: {
    userApi() {
      return this.$app.interfaces.userApi
    }

  },
  methods: {
    async refreshAsync() {
      await this.getUsersAsync()
    }
    ,
    async getUsersAsync() {
      try {
        const users = await this.userApi.getUsersJson()
        this.users = users
      } catch (e) {
        console.log(`get users failed ${e.message}`)
      }
    }
  }
}


</script>
<style lang="scss" scoped>

</style>
