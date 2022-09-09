<template>
  <div class="main__container " style="">
    <div class="view__album"
         v-for="(album, index) in userAlbum"
         :key="index"
    >
      <Slider
          class="slider"
          :photoInAlbum="album.photo"
          :numberSlider="index"
          :idAlbum="openPopup"
      />
    </div>

  </div>


</template>


<script>
// import SliderPopup from "@/components/slider/slider/albumPopup/SliderPopup";
import Slider from "@/components/slider/sliderForMiniAlbum/Slider";


export default {
  name: "ContainerSliders",
  components: {

    Slider
  },
  data() {
    return {
      userAlbum: [],
      popUpIsOpen: false,
    }
  },
  watch: {

  },
  async created() {
    await this.refreshAsync()
  },
  computed: {
    albumApi() {
      return this.$app.interfaces.albumApi
    },
    photoApi() {
      return this.$app.interfaces.photoApi
    }
  },
  mounted() {
    this.openPopup()
  },
  methods: {
    async refreshAsync() {
      await this.getAlbumUsers();
      await this.getPhotoAlbums();
    },
    async getAlbumUsers() {
      try {
        const album = await this.albumApi.getUserAlbumAsync(this.$route.params['id'])
        this.userAlbum = album
        console.log(album, 222)
      } catch (e) {
        console.log(`get photos failed ${e.message}`)
      }
    },
    async getPhotoAlbums() {
      try {
        const albumWithPhoto = await this.photoApi.getPhotoAsync(this.userAlbum)
        this.userAlbum = albumWithPhoto
      } catch (e) {
        console.log(`get photos failed ${e.message}`)
      }
    },
    openPopup(_idAlbum) {
      console.log(_idAlbum, 222)
      this.popupIsOpen = true
    }
  }
}
</script>

<style lang="scss" scoped>
@import "style/containerSlider";
</style>
