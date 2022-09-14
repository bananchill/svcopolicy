<template>
  <div class="user__actives">
    <div class="menu__name"
         v-for="(tab) in tabs"
         :key="tab.id"
         @click="setActiveTab(tab)"
         :class="{active: tab === activeTab}"
    >
        <span>
          {{ tab.title }}
        </span>
    </div>
  </div>

</template>

<script>

export default {
  name: "TabsComponent",
  components: {},
  props: {
    tabs: {
      type: Array,
      required: true
    },
    activeTab: {
      type: Object,
      default: (() => {})
    }
  },
  emits: ['activeTab'],
  data() {
    return {}
  },
  methods: {
    setActiveTab(_tab) {
      this.$emit('activeTab', _tab)
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

<style scoped lang="scss">
@import "style/tabs.scss";
</style>
