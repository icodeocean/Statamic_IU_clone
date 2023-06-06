export default () => ({
  searchData: {},
  searchInitialized: false,
  searchOpen: false,
  searchTerm: '',
  get searchShown() {
    return this.searchInitialized && this.searchOpen
  },
  get searchResults() {
    if (this.searchTerm.length && Object.keys(this.searchData)?.length) {
      return Object.entries(this.searchData)
        .map(([name, items]) => {
          return [
            name,
            items.filter((item) => {
              return (
                item.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                (item.prefix && item.prefix.toLowerCase().includes(this.searchTerm.toLowerCase()))
              )
            })
          ]
        })
        .filter(([name, items]) => {
          return items?.length > 0
        })
    } else {
      return []
    }
  },
  hasPrefix(option) {
    return option?.prefix?.length > 0
  },
  getPrefix(option) {
    return this.hasPrefix(option) ? `${option.prefix} - ` : ''
  },
  submitSearch() {
    window.location.href = `${window.searchPage}?s=${encodeURIComponent(this.searchTerm)}`
  },
  closeSearch() {
    if (this.searchShown) {
      this.searchOpen = false
      this.bodyNoScroll = false
    }
  },
  async openSearch() {
    try {
      if (!this.searchInitialized) {
        this.searchData = await (await fetch(window.searchEndpoint)).json()
        this.searchInitialized = true
      }

      this.bodyNoScroll = true
      this.searchOpen = true
      this.$nextTick(() => {
        this.$refs.searchInput.focus()
      })
    } catch (err) {
      console.error(err)
    }
  }
})
