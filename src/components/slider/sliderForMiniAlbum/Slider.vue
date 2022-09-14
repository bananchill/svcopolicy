<template>
  <div class="users__container" v-if="photoInAlbum">
    <div class="slidershow-container">
      <div
          v-for="(photo, index) in photoInAlbum.slice(0,5)"
          :key="photo.id"
          class="mySlides fade"
          :class=" ['numberSlider__'+numberSlider, index+1=== 1 ? ' active__slider' : '']"
      >
        <div
            class="number__text"> {{ index + 1 }} / 5
        </div>
        <img
            class="picture"
            :src="photo.url"
            alt="Картинки нет">
      </div>
      <a
          v-on:click="plusSlides(-1)"
          class="prev"> &#10094; </a>
      <a
          v-on:click="plusSlides(1)"
          class="next"> &#10095; </a>

    </div>
    <br>
    <div class="active__user">
         <span v-for="index in 5"
               :key="index"
               class="dot"
               :class=" [' currentSlider__' + numberSlider, index === 1 ? ' active' : '']"
               v-on:click="currentSlide(index)"/>
    </div>
    <div class="open__album">
      <button class="button__album button__choose"
              @click="openPopUp"
      > Альбом
      </button>
    </div>

    <AlbumPopup
        class="albumPopup"
        v-model:popUpIsOpen="popUpIsOpen"
        :photo="photoInAlbum"
    />
  </div>
</template>

<script>
import AlbumPopup from "@/components/albumPopup/AlbumPopup";

export default {
  name: "sliderPage",
  components: {
    AlbumPopup
  },
  props: {
    photoInAlbum: {
      type: [],
      default: null,
    },
    numberSlider: Number,
  },
  data() {
    return {
      sliderIndex: 1,
      popUpIsOpen: false,
    }
  },
  methods: {
    plusSlides(n) {
      this.showSlides(this.sliderIndex += n);
    },
    currentSlide(n) {
      this.showSlides(this.sliderIndex = n);
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
    openPopUp() {
      this.popUpIsOpen = !this.popUpIsOpen
    }
  }
}
</script>

<style lang="scss" scoped>
@import "style/slider";
</style>
