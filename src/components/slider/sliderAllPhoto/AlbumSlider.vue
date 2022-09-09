<template>
  <div
      class="popUp__container"
      v-if="photoInAlbum"
  >

    <div class="slidershow-container">

      <div
          v-for="(photo) in filteredTickers()"
          :key="photo.id"
          class="mySlides fade"

      >
        <div class="container__picture">
          <div
              class="number__text"> {{ photo.id + 1 }} / {{ photoInAlbum.length }}
          </div>
          <img
              class="picture"
              :src="photo.url"
              alt="Картинки нет">
        </div>

      </div>
    </div>
    <div class="user__action">
      <button
          class="button__back button__choose"
          @click="page = page - 1"
      >
        Назад
      </button>
      <button
          class="button__next button__choose"
          @click="page = page + 1"
      >
        Вперед
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "sliderPage",
  components: {},
  props: {
    photoInAlbum: {
      type: Array,
      default: null,
    },
    numberSlider: Number,
  },
  data() {
    return {
      page: 1,
      hasNextPage: true,
    }
  },
  emits: ['update:isShowPopup']
  ,
  watch: {
    page() {
      this.filteredTickers()
    }
  },
  methods: {
    closePopUp(){
      this.$emit('update:isShowPopup', false)
    },
    filteredTickers() {
      const maxPage = Math.ceil(this.photoInAlbum.length / 6);

      if (maxPage < this.page)
        this.page = 1
      if (this.page < 1)
        this.page = maxPage

      const start = (this.page - 1) * 6;
      const end = this.page * 6;

      this.hasNextPage = this.photoInAlbum.length > end;

      return this.photoInAlbum.slice(start, end);
    },
    showSlides(n) {
      let i;
      let slides = document.getElementsByClassName("numberSlider__" + this.numberSlider);
      let dots = document.getElementsByClassName("currentSlider__" + this.numberSlider);

      if (slides.length < n)
        this.sliderIndex = 1
      if (n < 1)
        this.sliderIndex = slides.length

      for (i = 0; i < slides.length; i++) {
        slides[i].className = slides[i].className
            .replace(" active__slider", " ");
      }
      for (i = 0; i < slides.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
      }

      slides[this.sliderIndex - 1].className += " active__slider";
      dots[this.sliderIndex - 1].className += " active";
    },
  }
}
</script>

<style lang="scss" scoped>
@import "style/albumSlider";
</style>
