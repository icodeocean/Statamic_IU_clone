document.addEventListener('alpine:init', () => {
  Alpine.data('modalAlpine', () => ({
    isOpen: false,
    modalId: null,
    cookieLifetime: 365,
    init() {
      this.modalId = this.$root.getAttribute('id')

      this.$watch('isOpen', (value) => {
        this.bodyNoScroll = value

        const event = value ? 'modal-shown' : 'modal-closed'
        this.$dispatch(event, { id: this.modalId })
      })

      if (this.$root.dataset?.shown === 'true') {
        this.isOpen = true
      }

      if (this.modalId === 'geo-overlay') {
        this.initGeoOverlay()
      } else if (this.modalId.startsWith('popup')) {
        this.$nextTick(() => this.initPopUp())
      }

      document.querySelectorAll(`[href="#${this.modalId}"]`).forEach((modalTrigger) => {
        modalTrigger.addEventListener('click', (e) => {
          e.preventDefault()
          this.isOpen = true
        })
      })

      this.$root.querySelectorAll('.cp-modal-close').forEach((closeTrigger) => {
        closeTrigger.addEventListener('click', (e) => {
          e.preventDefault()
          this.isOpen = false
        })
      })
    },
    setStayCookie() {
      window.Cookies.set('stay_on_page', true)
    },
    initGeoOverlay() {
      if (document.body.dataset.hideGeoOverlay === 'true') {
        this.setStayCookie()
      }

      const stayOnPageCookie = window.Cookies.get('stay_on_page')

      if (typeof stayOnPageCookie === 'undefined' || stayOnPageCookie !== 'true') {
        this.isOpen = true
      }
    },
    initPopUp() {
      const activeDevices = JSON.parse(this.$root.dataset.activeDevices)
      const activeDesktop = activeDevices?.desktop || false
      const activeMobile = activeDevices?.mobile || false

      if (
        (activeDesktop && activeMobile) ||
        (activeDesktop && !this.isHandheldViewport) ||
        (activeMobile && this.isHandheldViewport)
      ) {
        const cookieLifetimeAttr = parseInt(this.$root.dataset.cookieLifetime || 0)
        const stayOnPageCookie = window.Cookies.get('stay_on_page')

        if (cookieLifetimeAttr > 0) {
          this.cookieLifetime = cookieLifetimeAttr
        }

        if (
          typeof window.Cookies.get(this.modalId) !== 'undefined' ||
          (document.querySelector('#geo-overlay') && typeof stayOnPageCookie === 'undefined')
        ) {
          return
        }

        this.isOpen = true
      }
    },
    setPopUpCookie() {
      window.Cookies.set(this.modalId, true, { expires: this.cookieLifetime })
    },
    closePopUp(element) {
      this.setPopUpCookie()
      window.location.href = element.getAttribute('href')
    }
  }))
})
