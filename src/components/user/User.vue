<template>
  <div class="user__profile">
    <div
        class="user__data"
    >
      <div class="user__img">
        <img class="avatar" src="../../static/usersUn.jpg">
      </div>
      <div class="user__info">
        <div class="info user__name">
          Name: <span>
          {{ user?.name }}
          </span>

        </div>
        <div class="info user__username">
          Username: <span>
          {{ user?.username }}
      </span>
        </div>
        <div class="info user__email">
          Email: <span>
          {{ user?.email }}
          </span>
        </div>
        <div class="info user__website">
          Website: <span>
          {{ user?.website }}
      </span>
        </div>
      </div>
    </div>
    <Tabs :tabs="tabs"
          :activeTab="activeTab"
          @activeTab="setActiveTab"
    />

    <div class="container__user__select">
      <ContainerAlbum
          class="container__album"
          v-if="activeTab === tabs.Album"
      />
      <Post
          v-if="activeTab === tabs.Posts"
      />
    </div>


  </div>
</template>

<script>
import Post from "@/components/post/Post";
import ContainerAlbum from "@/components/containerSlider/ContainerSlider";
import Tabs from "@/components/tabs/Tabs"

const tabs = {
  Posts: {
    name: 'posts',
    title: 'Посты',
  },
  Album: {
    name: 'albums',
    title: 'Альбомы',
  },
}
export default {
  name: "SoloUser",
  components: {
    ContainerAlbum,
    Post,
    Tabs
  },
  data() {
    return {
      user: {
        type: Array,
        default: null
      },
      tabs,
      activeTab: tabs.Album,
    }
  },
  async created() {
    let queryPage = String.prototype.toLowerCase.apply(this.$route.query['page'])
    this.setActiveTab(
        tabs.Posts.name === queryPage
            ? tabs.Posts : this.activeTab
    )
    await this.getUser()
  },
  computed: {
    userApi() {
      return this.$app.interfaces.userApi
    }
  },
  methods: {
    async getUser() {
      try {
        const user = await this.userApi.getInfoAsync(this.$route.params['id'])
        this.user = user
      } catch (e) {
        console.log(`get users failed ${e.message}`)
      }
    },
    setActiveTab(_tab) {
      this.activeTab = _tab
      this.setActiveURL(_tab)
    },
    setActiveURL(_tab) {
      this.$router.push({
        params: {
          id: this.$route.params['id']
        }, query: {page: _tab.name}
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "style/user";
@import "style/userMedia";
</style>
