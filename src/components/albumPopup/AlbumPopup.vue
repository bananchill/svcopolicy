<template>
  <transition name="popup-modal">
    <div ref="popupContainer"
         class="popup"
         v-if="isShowModal"

    >
      <div class="b-popup-content"
           @click="processUserInput($event)"
      >
        <div class="white">
          <div class="close__popUp">
              <span class="close"
                   @click="closePopUp"
                 >
                  &bigotimes;
              </span>
          </div>

          <SliderAllPhoto
              v-model:isShowModal="isShowModal"
              :photoInAlbum="photo"
              class="slider"
          />
        </div>
      </div>
    </div>
  </transition>

</template>

<script>
import SliderAllPhoto from "@/components/slider/sliderAllPhoto/AlbumSlider";
import {markRaw} from 'vue';

export default {
  name: "SliderPopup",
  components: {
    SliderAllPhoto
  },
  props: {
    popUpIsOpen: {
      type: Boolean,
      default: false,
    },
    photo: {
      type: Array,
      default: null,
    }
  },
  data() {
    return {
      isShowModal: false,
      state: markRaw({
        body: null,
      }),
    }
  },
  emits: ['update:popUpIsOpen'],
  mounted() {
    this.state.body = document.querySelector('body');
    document.addEventListener('click', this.processUserInput, true);
    document.addEventListener('keydown', this.handleKeyDown);

  },
  beforeUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown)
    document.removeEventListener('click', this.processUserInput, true)
    this.isShowModal = false;
  },
  watch: {
    popUpIsOpen(newValue) {
      this.switchShowPopup(newValue);
      if (newValue && this.state.body) this.state.body.style.overflow = "hidden";
      if (!newValue && this.state.body) this.state.body.removeAttribute("style");
    },
  },
  methods: {
    handleKeyDown(e) {
      if (this.isShowModal && e.key === 'Escape') {
        this.closePopUp()
      }
    },
    switchShowPopup(_isVisible) {
      if (_isVisible)
        setTimeout(() => {
          this.isShowModal = _isVisible;
        }, 150);

      setTimeout(() => this.isShowModal = _isVisible, 150);

    },
    closePopUp() {
      this.$emit('update:popUpIsOpen', false);
    },
    processUserInput(_event) {
      if (this.isShowModal !== true) return;

      const {target, keyCode} = _event;
      const isClickOutside = !target.closest('.b-popup-content') && !keyCode;

      const isPressedEsc = keyCode === 27;
      if (
          (isClickOutside) ||
          (isPressedEsc) //|| isClickClose
      ) {
        this.closePopUp();
      }
    }

  },
}
</script>

<style lang="scss" scoped>
@import "style/AlbumPopup";
</style>
