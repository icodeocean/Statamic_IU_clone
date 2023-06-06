export default () => ({
  navOpen: false,
  activeLevelOne: null,
  init() {
    this.$watch('isHandheldViewport', (value) => {
      if (!value && this.navOpen) {
        this.toggleNav()
      }
    })
  },
  toggleNav() {
    if (this.navOpen) {
      this.activeLevelOne = null
      this.$dispatch('close-nav')
    } else {
      this.$dispatch('open-nav')
    }

    this.navOpen = !this.navOpen
    this.bodyNoScroll = this.navOpen
  },
  toggleLevelOne(event, id) {
    if (this.isHandheldViewport) {
      event.preventDefault()
      this.activeLevelOne = this.activeLevelOne === id ? null : id
    }
  },
  isActiveChild(id) {
    return this.activeLevelOne === id
  },
  hasActiveChild(id) {
    return this.activeLevelOne !== null && this.activeLevelOne !== id
  }
})
